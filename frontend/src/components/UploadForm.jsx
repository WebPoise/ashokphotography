import React, { useState } from 'react';
import { uploadImage } from '../api';
import imageCompression from 'browser-image-compression';

const categories = [
	{ id: 'weddings', name: 'Weddings' },
	{ id: 'portraits', name: 'Portraits' },
	{ id: 'bridal shoot', name: 'Bridal Shoot' },
	{ id: 'art', name: 'Fine Art' },
	{ id: 'maternity', name: 'Maternity' },
	{ id: 'newborn', name: 'Newborn' },
	{ id: 'housing', name: 'Housing' },
	{ id: 'nature', name: 'Nature' },
	{ id: 'landscape', name: 'Landscape' },
];

const UploadForm = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [category, setCategory] = useState(categories[0].id);
	const [uploadStatus, setUploadStatus] = useState('');
	const [isUploading, setIsUploading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!image) {
			setUploadStatus('Please select an image.');
			return;
		}

		try {
			setIsUploading(true);
			setUploadStatus('Compressing image...');

			console.log('Original Size:', image.size / 1024 / 1024, 'MB');

			const compressedImage = await imageCompression(image, {
	maxSizeMB: 4,
	maxWidthOrHeight: 3000,
	initialQuality: 0.95,
	useWebWorker: true,
});

			console.log(
				'Compressed Size:',
				compressedImage.size / 1024 / 1024,
				'MB',
			);

			const formData = new FormData();
			formData.append('title', title);
			formData.append('description', description);
			formData.append('image', compressedImage, compressedImage.name);
			formData.append('category', category);

			setUploadStatus('Uploading image...');

			await uploadImage(formData);

			setUploadStatus('Image uploaded successfully!');
			setTitle('');
			setDescription('');
			setImage(null);
			setCategory(categories[0].id);
		} catch (error) {
			console.error('Error uploading image', error);
			setUploadStatus('Error uploading image.');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="p-8 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6 text-center">
				Upload New Image
			</h2>

			{uploadStatus && (
				<p
					className={`mb-4 ${
						uploadStatus.includes('successfully')
							? 'text-green-500'
							: uploadStatus.includes('Error')
							? 'text-red-500'
							: 'text-blue-500'
					}`}
				>
					{uploadStatus}
				</p>
			)}

			<form
				onSubmit={handleSubmit}
				encType="multipart/form-data"
				className="space-y-6"
			>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Title
					</label>
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className="w-full p-3 border border-gray-300 rounded-lg"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Description
					</label>
					<textarea
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						className="w-full p-3 border border-gray-300 rounded-lg"
						rows="4"
					></textarea>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Category
					</label>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full p-3 border border-gray-300 rounded-lg"
					>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Image
					</label>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
						required
						className="w-full p-3 border border-gray-300 rounded-lg"
					/>
				</div>

				<button
					type="submit"
					disabled={isUploading}
					className="w-full bg-lollipop text-white py-3 rounded-lg hover:bg-earthyBrown transition-all disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isUploading ? 'Uploading...' : 'Upload'}
				</button>
			</form>
		</div>
	);
};

export default UploadForm;
