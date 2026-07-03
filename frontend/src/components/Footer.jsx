import React, { useEffect, useState } from 'react';
import { API } from '../api';

const Footer = () => {
	const [studio, setStudio] = useState(null);

	useEffect(() => {
		API.get('/studio')
			.then((res) => setStudio(res.data.studio))
			.catch((err) => console.error('Studio fetch error:', err));
	}, []);

	const whatsappNumber = studio?.whatsapp?.replace(/\D/g, '');

	return (
		<footer className="bg-gray-900 text-white py-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center">
					<p className="text-center">
						© {new Date().getFullYear()} {studio?.studioName || 'Ashok Photography'}. All rights reserved.
					</p>

					<div className="mt-4 flex flex-wrap justify-center gap-6">
						{studio?.instagram && <a href={studio.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
						{studio?.facebook && <a href={studio.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
						{whatsappNumber && <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
						{studio?.email && <a href={`mailto:${studio.email}`}>Email</a>}
					</div>

					<p className="mt-4 text-sm text-gray-400 text-center">
						{studio?.tagline || 'Capturing timeless moments, creating memories that last forever.'}
					</p>

					<p className="mt-3 text-sm text-gray-500 text-center">
						Developed by <a href="https://www.webpoise.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">WebPoise</a>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;