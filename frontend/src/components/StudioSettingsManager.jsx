import React, { useEffect, useState } from 'react';
import { API } from '../api';

const StudioSettingsManager = () => {
	const [form, setForm] = useState({
		studioName: '',
		tagline: '',
		aboutTitle: '',
		aboutDescription: '',
		photographerName: '',
		phone: '',
		whatsapp: '',
		email: '',
		address: '',
		instagram: '',
		facebook: '',
		youtube: '',
		googleMaps: '',
		logoUrl: '',
		profilePhotoUrl: '',
		heroImageUrl: '',
		heroTitle: '',
		heroSubtitle: '',
	});

	const [files, setFiles] = useState({
		logo: null,
		hero: null,
		profile: null,
	});

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		API.get('/studio')
			.then((res) => setForm((prev) => ({ ...prev, ...(res.data.studio || {}) })))
			.catch((err) => console.error('Error fetching studio:', err))
			.finally(() => setLoading(false));
	}, []);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const uploadStudioImage = async (type) => {
		const file = files[type];
		if (!file) {
			alert('Please select image first');
			return null;
		}

		const formData = new FormData();
		formData.append('image', file);
		formData.append('title', `${form.studioName || 'Studio'} ${type} image`);
		formData.append('description', `${type} image for studio settings`);
		formData.append('category', 'studio-assets');
		formData.append('isStudioAsset', 'true');
		formData.append('studioAssetType', type);

		const response = await API.post('/images', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		return response.data.imageUrl;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setSaving(true);

			const updatedForm = { ...form };

			if (files.logo) {
				updatedForm.logoUrl = await uploadStudioImage('logo');
			}

			if (files.hero) {
				updatedForm.heroImageUrl = await uploadStudioImage('hero');
			}

			if (files.profile) {
				updatedForm.profilePhotoUrl = await uploadStudioImage('profile');
			}

			await API.patch('/studio', updatedForm);
			setForm(updatedForm);
			setFiles({ logo: null, hero: null, profile: null });

			alert('Studio settings updated successfully');
		} catch (error) {
			console.error('Error updating studio settings:', error);
			alert('Failed to update studio settings');
		} finally {
			setSaving(false);
		}
	};

	if (loading) return <p>Loading studio settings...</p>;

	return (
		<form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
			<h2 className="text-2xl font-bold mb-4">Studio Settings</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div>
					<label className="block font-semibold mb-2">Logo Image</label>
					{form.logoUrl && <img src={form.logoUrl} alt="Logo" className="h-24 w-full object-cover rounded mb-2" />}
					<input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, logo: e.target.files[0] })} />
				</div>

				<div>
					<label className="block font-semibold mb-2">Hero Image</label>
					{form.heroImageUrl && <img src={form.heroImageUrl} alt="Hero" className="h-24 w-full object-cover rounded mb-2" />}
					<input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, hero: e.target.files[0] })} />
				</div>

				<div>
					<label className="block font-semibold mb-2">Profile Image</label>
					{form.profilePhotoUrl && <img src={form.profilePhotoUrl} alt="Profile" className="h-24 w-full object-cover rounded mb-2" />}
					<input type="file" accept="image/*" onChange={(e) => setFiles({ ...files, profile: e.target.files[0] })} />
				</div>
			</div>

			{Object.keys(form)
				.filter((key) => !['logoUrl', 'heroImageUrl', 'profilePhotoUrl', '_id', '__v', 'createdAt', 'updatedAt'].includes(key))
				.map((key) => (
					<div key={key}>
						<label className="block font-semibold capitalize mb-1">
							{key.replace(/([A-Z])/g, ' $1')}
						</label>

						{key === 'aboutDescription' || key === 'address' ? (
							<textarea name={key} value={form[key] || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded" rows="4" />
						) : (
							<input type="text" name={key} value={form[key] || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
						)}
					</div>
				))}

			<button type="submit" disabled={saving} className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-pink-600">
				{saving ? 'Saving...' : 'Save Studio Settings'}
			</button>
		</form>
	);
};

export default StudioSettingsManager;