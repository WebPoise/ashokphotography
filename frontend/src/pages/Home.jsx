import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import GallerySections from '../components/GallerySections';
import { Helmet } from 'react-helmet-async';
import { API } from '../api';

const Home = () => {
	const [studio, setStudio] = useState(null);

	useEffect(() => {
		API.get('/studio')
			.then((res) => setStudio(res.data.studio))
			.catch((err) => console.error('Studio fetch error:', err));
	}, []);

	return (
		<div className="bg-neutralGray text-earthyBrown">
			<Helmet>
				<title>{studio?.studioName || 'Ashok Photography'} | WebPoise</title>
				<meta name="description" content={studio?.tagline || 'Professional photography services.'} />
				<meta name="author" content="WebPoise" />
			</Helmet>

			<Hero />

			<div className="px-4 sm:px-6 lg:px-8">
				<About />
				<GallerySections />
			</div>
		</div>
	);
};

export default Home;