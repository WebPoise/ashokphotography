import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

const Hero = () => {
	const navigate = useNavigate();
	const [studio, setStudio] = useState(null);

	useEffect(() => {
		API.get('/studio')
			.then((res) => setStudio(res.data.studio))
			.catch((err) => console.error('Studio fetch error:', err));
	}, []);

	const heroImageUrl =
		studio?.heroImageUrl ||
		'https://api.fotods.no/assets/Dawid_hero.jpg';

	return (
		<div className="relative h-screen bg-cover bg-center flex items-start md:h-[150vh]">
			<img src={heroImageUrl} alt="Photography studio" className="absolute inset-0 w-full h-full object-cover" />

			<div className="absolute inset-0 bg-[#D19C6A] bg-opacity-60"></div>

			<div className="absolute inset-0 flex items-center justify-center px-4">
				<div className="text-center text-white">
					<h1 className="text-5xl md:text-6xl font-heading">
						{studio?.heroTitle || 'Capturing Timeless Moments'}
					</h1>

					<p className="mt-4 text-lg md:text-xl font-body">
						{studio?.heroSubtitle || 'Professional photography for weddings, portraits, events, and special occasions.'}
					</p>

					<button onClick={() => navigate('/book')} className="mt-8 px-8 py-3 bg-lightAccent text-earthyBrown rounded-lg hover:bg-lollipop hover:text-white transition-all">
						Book Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;