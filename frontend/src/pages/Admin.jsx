import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet-async';
import { API } from '../api';

const LazyUploadForm = lazy(() => import('../components/UploadForm'));
const LazyAdminGalleryOrder = lazy(() =>
	import('../components/AdminGalleryOrder'),
);
const LazyImageList = lazy(() => import('../components/ImageList'));
const LazyPricingManager = lazy(() =>
	import('../components/PricingManager'),
);

const LazyStudioSettingsManager = lazy(() =>
	import('../components/StudioSettingsManager'),
);



const Admin = () => {
	const [bookings, setBookings] = useState([]);
	const [view, setView] = useState(
		localStorage.getItem('adminView') || 'bookings',
	);
	const [isLoading, setIsLoading] = useState(true);
	const [adminName, setAdminName] = useState('');
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');
		navigate('/login');
	};

	useEffect(() => {
		const userInfo = localStorage.getItem('userInfo');

		if (userInfo) {
			const { name } = JSON.parse(userInfo);
			setAdminName(name);
		} else {
			const token = localStorage.getItem('token');

			if (token) {
				try {
					const decoded = jwtDecode(token);
					setAdminName(decoded.name);
				} catch (error) {
					console.error('Error decoding token:', error);
					navigate('/login');
				}
			} else {
				navigate('/login');
			}
		}
	}, [navigate]);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				setIsLoading(true);
				const response = await API.get('/bookings');
				setBookings(response.data.bookings || []);
			} catch (error) {
				console.error('Error fetching bookings:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBookings();
	}, []);

	const changeView = (newView) => {
		setView(newView);
		localStorage.setItem('adminView', newView);
	};

	const handleAction = async (bookingId, status) => {
		try {
			const response = await API.patch(`/bookings/${bookingId}`, {
				status,
			});

			const updatedBooking = response.data.booking;

			setBookings((prevBookings) =>
				prevBookings.map((booking) =>
					booking._id === updatedBooking._id
						? updatedBooking
						: booking,
				),
			);
		} catch (error) {
			console.error('Error updating booking status:', error);
			alert('Failed to update booking status');
		}
	};

	const handleDelete = async (bookingId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this booking?',
		);

		if (!confirmDelete) return;

		try {
			await API.delete(`/bookings/${bookingId}`);

			setBookings((prevBookings) =>
				prevBookings.filter((booking) => booking._id !== bookingId),
			);
		} catch (error) {
			console.error('Error deleting booking:', error);
			alert('Failed to delete booking');
		}
	};

	const renderContent = () => {
		switch (view) {
			case 'bookings':
				return (
					<ul>
						{bookings.length === 0 ? (
							<p className="text-center text-gray-600">
								No bookings found.
							</p>
						) : (
							bookings.map((booking) => (
								<li
									key={booking._id}
									className="mb-4 p-4 bg-white shadow-lg rounded-lg py-10 mt-10"
								>
									<p>
										<strong>Name:</strong> {booking.name}
									</p>

									<p>
										<strong>Phone No:</strong>{' '}
										<a
											href={`tel:${booking.phone}`}
											className="text-blue-600 underline"
										>
											{booking.phone || 'Not provided'}
										</a>
									</p>

									<p>
										<strong>Date:</strong> {booking.date}
									</p>

									<p>
										<strong>Message:</strong>{' '}
										{booking.message}
									</p>

									<p>
										<strong>Status:</strong>{' '}
										<span
											className={
												booking.status === 'accepted'
													? 'text-green-600 font-bold'
													: booking.status ===
													  'declined'
													? 'text-red-600 font-bold'
													: 'text-yellow-600 font-bold'
											}
										>
											{booking.status}
										</span>
									</p>

									<div className="mt-4">
										<button
											className="mr-4 bg-green-500 text-white px-4 py-2 rounded"
											onClick={() =>
												handleAction(
													booking._id,
													'accepted',
												)
											}
										>
											Accept
										</button>

										<button
											className="mr-4 bg-yellow-500 text-white px-4 py-2 rounded"
											onClick={() =>
												handleAction(
													booking._id,
													'declined',
												)
											}
										>
											Decline
										</button>

										<button
											className="bg-red-600 text-white px-4 py-2 rounded"
											onClick={() =>
												handleDelete(booking._id)
											}
										>
											Delete
										</button>
									</div>
								</li>
							))
						)}
					</ul>
				);

			case 'upload':
				return (
					<Suspense fallback={<LoadingSpinner />}>
						<LazyUploadForm />
					</Suspense>
				);

			case 'manageGalleries':
				return (
					<Suspense fallback={<LoadingSpinner />}>
						<LazyAdminGalleryOrder />
					</Suspense>
				);

			case 'imageList':
				return (
					<Suspense fallback={<LoadingSpinner />}>
						<LazyImageList />
					</Suspense>
				);

			case 'pricing':
				return (
					<Suspense fallback={<LoadingSpinner />}>
						<LazyPricingManager />
					</Suspense>
				);

			case 'studio':
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<LazyStudioSettingsManager />
		</Suspense>
	);

			default:
				return null;
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="container mx-auto px-4 py-8 mt-20">
			<Helmet>
				<title>Admin Panel | FotoDS</title>
			</Helmet>

			<div className="space-y-8">
				<div className="min-h-screen grid grid-cols-1 md:grid-cols-4">
					<aside className="bg-gray-800 text-white py-8 md:min-h-screen">
						<div className="px-6">
							<h2 className="text-3xl font-bold mb-2">
								Admin Panel
							</h2>

							<p className="text-gray-400 mb-8">
								Welcome {adminName}
							</p>

							<nav className="space-y-4">
								<button
									onClick={() => changeView('bookings')}
									className="block w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
								>
									Bookings
								</button>

								<button
									onClick={() => changeView('upload')}
									className="block w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
								>
									Upload Images
								</button>

								<button
									onClick={() =>
										changeView('manageGalleries')
									}
									className="block w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
								>
									Manage Galleries
								</button>

								<button
									onClick={() => changeView('imageList')}
									className="block w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
								>
									Image List
								</button>

								<button
									onClick={() => changeView('pricing')}
									className="block w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
								>
									Pricing Management
								</button>


								<button
	onClick={() => changeView('studio')}
	className="block w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
>
	Studio Settings
</button>

								<button
									onClick={handleLogout}
									className="block w-full text-left px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg"
								>
									Logout
								</button>
							</nav>
						</div>
					</aside>

					<main className="col-span-3 p-8 bg-gray-100">
						<h2 className="text-4xl font-bold mb-6">
						{view === 'bookings'
							? 'Bookings'
							: view === 'upload'
							? 'Upload Images'
							: view === 'manageGalleries'
							? 'Manage Galleries'
							: view === 'pricing'
							? 'Pricing Management'
							: view === 'studio'
							? 'Studio Settings'
							: 'Image List'}
						</h2>

						{renderContent()}
					</main>
				</div>
			</div>
		</div>
	);
};

export default Admin;