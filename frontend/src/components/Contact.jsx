import React, { useEffect, useState } from 'react';
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

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const whatsappNumber =
			studio?.whatsapp?.replace(/\D/g, '') ||
			studio?.phone?.replace(/\D/g, '');

		if (whatsappNumber) {
			const whatsappMessage = `Hello, my name is ${formData.name}. Phone: ${formData.phone}. Message: ${formData.message}`;
			window.open(
				`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
					whatsappMessage,
				)}`,
				'_blank',
			);
			setSuccessMessage('Thank you! WhatsApp chat has been opened.');
		} else {
			setSuccessMessage(
				'Thank you for contacting us. Please contact us by phone or email.',
			);
		}

		setFormData({ name: '', phone: '', message: '' });
	};

	return (
		<section id="kontakt" className="py-20 bg-white text-center">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-4xl font-bold text-gray-800 mb-8">
					Contact
				</h2>

				<p className="text-lg text-gray-600 mb-4">
					Have any questions? Feel free to contact{' '}
					{studio?.studioName || 'us'}.
				</p>

				<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
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
						placeholder="Your Phone"
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

					<button className="px-6 py-3 bg-lollipop text-white font-semibold rounded-lg">
						Send on WhatsApp
					</button>
				</form>

				{successMessage && (
					<p className="mt-4 text-lg text-green-500">
						{successMessage}
					</p>
				)}
			</div>
		</section>
	);
};

export default Contact;