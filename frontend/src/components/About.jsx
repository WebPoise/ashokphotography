import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faInstagram,
	faFacebook,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { API } from '../api';

const About = () => {
	const [studio, setStudio] = useState(null);

	useEffect(() => {
		const fetchStudio = async () => {
			try {
				const response = await API.get('/studio');
				setStudio(response.data.studio);
			} catch (error) {
				console.error('Error fetching studio:', error);
			}
		};

		fetchStudio();
	}, []);

	return (
		<section id="about" className="py-20 bg-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">

				{/* Profile Image */}
				{studio?.profilePhotoUrl && (
					<div className="w-full md:w-1/2">
						<div className="w-full rounded-lg shadow-lg bg-white p-2">
							<img
								src={studio.profilePhotoUrl}
								alt={
									studio?.photographerName ||
									studio?.studioName ||
									'Photographer'
								}
								className="w-full h-auto rounded-lg"
							/>
						</div>
					</div>
				)}

				{/* About Content */}
				<div
					className={
						studio?.profilePhotoUrl
							? 'w-full md:w-1/2 text-center md:text-left'
							: 'w-full text-center'
					}
				>
					<h2 className="text-4xl font-bold text-gray-800 mb-6">
						{studio?.aboutTitle || 'About Us'}
					</h2>

					<p className="text-lg text-gray-600 whitespace-pre-line leading-relaxed">
						{studio?.aboutDescription ||
							'I am a passionate professional photographer dedicated to capturing life’s most meaningful moments.'}
					</p>

					<div
						className={`flex space-x-6 mt-8 ${
							studio?.profilePhotoUrl
								? 'justify-center md:justify-start'
								: 'justify-center'
						}`}
					>
						{studio?.instagram && (
							<a
								href={studio.instagram}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-500 hover:text-pink-600"
							>
								<FontAwesomeIcon
									icon={faInstagram}
									size="2x"
								/>
							</a>
						)}

						{studio?.facebook && (
							<a
								href={studio.facebook}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-500 hover:text-blue-600"
							>
								<FontAwesomeIcon
									icon={faFacebook}
									size="2x"
								/>
							</a>
						)}

						{studio?.youtube && (
							<a
								href={studio.youtube}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-500 hover:text-red-600"
							>
								<FontAwesomeIcon
									icon={faYoutube}
									size="2x"
								/>
							</a>
						)}
					</div>
				</div>

			</div>
		</section>
	);
};

export default About;