import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faInstagram,
	faFacebook,
	faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import {
	faPhone,
	faEnvelope,
	faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { API } from '../api';

const Contact = () => {
	const [studio, setStudio] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		message: '',
	});

	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		API.get('/studio')
			.then((res) => setStudio(res.data.studio))
			.catch((err) => console.error('Studio fetch error:', err));
	}, []);

	const whatsappNumber =
		studio?.whatsapp?.replace(/\D/g, '') ||
		studio?.phone?.replace(/\D/g, '');

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!whatsappNumber) {
			setSuccessMessage('WhatsApp number is not available.');
			return;
		}

		const whatsappMessage = `Hello, my name is ${formData.name}. Phone: ${formData.phone}. Message: ${formData.message}`;

		window.open(
			`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
				whatsappMessage,
			)}`,
			'_blank',
		);

		setSuccessMessage('Thank you! WhatsApp chat has been opened.');
		setFormData({ name: '', phone: '', message: '' });
	};

	return (
		<section id="contact" className="py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-5xl font-extrabold text-gray-900 mb-4">
						Contact Us
					</h2>

					<p className="text-lg text-gray-600">
						Have questions or want to book a photoshoot? Get in
						touch with {studio?.studioName || 'us'}.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
					<div className="bg-white rounded-2xl shadow-lg p-8 text-left">
						<h3 className="text-2xl font-bold text-gray-900 mb-6">
							Get in Touch
						</h3>

						<div className="space-y-5 text-gray-700">
							{studio?.phone && (
								<p className="flex items-center gap-3">
									<FontAwesomeIcon
										icon={faPhone}
										className="text-pink-600"
									/>
									<a
										href={`tel:${studio.phone}`}
										className="hover:text-pink-600"
									>
										{studio.phone}
									</a>
								</p>
							)}

							{whatsappNumber && (
								<p className="flex items-center gap-3">
									<FontAwesomeIcon
										icon={faWhatsapp}
										className="text-green-600"
									/>
									<a
										href={`https://wa.me/${whatsappNumber}`}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-green-600"
									>
										Chat on WhatsApp
									</a>
								</p>
							)}

							{studio?.email && (
								<p className="flex items-center gap-3">
									<FontAwesomeIcon
										icon={faEnvelope}
										className="text-blue-600"
									/>
									<a
										href={`mailto:${studio.email}`}
										className="hover:text-blue-600"
									>
										{studio.email}
									</a>
								</p>
							)}

							{studio?.address && (
								<p className="flex items-center gap-3">
									<FontAwesomeIcon
										icon={faLocationDot}
										className="text-red-600"
									/>
									<span>{studio.address}</span>
								</p>
							)}
						</div>

						<div className="flex space-x-5 mt-8">
							{studio?.instagram && (
								<a
									href={studio.instagram}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-500 hover:text-pink-600 text-2xl"
								>
									<FontAwesomeIcon icon={faInstagram} />
								</a>
							)}

							{studio?.facebook && (
								<a
									href={studio.facebook}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-500 hover:text-blue-600 text-2xl"
								>
									<FontAwesomeIcon icon={faFacebook} />
								</a>
							)}

							{whatsappNumber && (
								<a
									href={`https://wa.me/${whatsappNumber}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-500 hover:text-green-600 text-2xl"
								>
									<FontAwesomeIcon icon={faWhatsapp} />
								</a>
							)}
						</div>
					</div>

					<form
						onSubmit={handleSubmit}
						className="bg-white rounded-2xl shadow-lg p-8"
					>
						<h3 className="text-2xl font-bold text-gray-900 mb-6">
							Send a Message
						</h3>

						<input
							type="text"
							name="name"
							placeholder="Your Name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full p-4 border border-gray-300 rounded-lg mb-4"
						/>

						<input
							type="tel"
							name="phone"
							placeholder="Your Phone Number"
							value={formData.phone}
							onChange={handleChange}
							required
							className="w-full p-4 border border-gray-300 rounded-lg mb-4"
						/>

						<textarea
							name="message"
							placeholder="Your Message"
							value={formData.message}
							onChange={handleChange}
							required
							className="w-full p-4 border border-gray-300 rounded-lg mb-4"
							rows="5"
						/>

						<button className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-pink-600 transition-all">
							Send on WhatsApp
						</button>

						{successMessage && (
							<p className="mt-4 text-lg text-green-600 text-center">
								{successMessage}
							</p>
						)}
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contact;