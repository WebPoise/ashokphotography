import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../api';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [studio, setStudio] = useState(null);

	useEffect(() => {
		API.get('/studio')
			.then((res) => setStudio(res.data.studio))
			.catch((err) => console.error('Studio fetch error:', err));
	}, []);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navLinks = [
		{ to: '/about', text: 'About' },
		{ to: '/book', text: 'Book Now' },
		{ to: '/prices', text: 'Packages' },
		{ to: '/gallery', text: 'Gallery' },
		{ to: '/reviews', text: 'Reviews' },
		{ to: '/contact', text: 'Contact' },
	];

	return (
		<nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-neutralGray shadow-lg' : 'bg-transparent'}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="text-2xl font-heading text-lollipop">
						<Link to="/">{studio?.studioName || 'Ashok Photography'}</Link>
					</div>

					<div className="hidden md:flex space-x-6">
						{navLinks.map((link) => (
							<Link key={link.to} to={link.to} className="text-earthyBrown hover:text-lollipop transition-colors">
								{link.text}
							</Link>
						))}
					</div>

					<div className="md:hidden">
						<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-earthyBrown hover:text-lollipop p-2">
							☰
						</button>
					</div>
				</div>

				{isMobileMenuOpen && (
					<div className="md:hidden bg-neutralGray/90 rounded-b-lg shadow-lg">
						{navLinks.map((link) => (
							<Link key={link.to} to={link.to} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-earthyBrown hover:text-lollipop">
								{link.text}
							</Link>
						))}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;