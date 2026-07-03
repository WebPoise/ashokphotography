import mongoose from 'mongoose';

const studioSchema = new mongoose.Schema(
	{
		studioName: { type: String, default: 'Studio Name' },
		tagline: { type: String, default: 'Capturing your special moments' },
		aboutTitle: { type: String, default: 'About Our Studio' },
		aboutDescription: { type: String, default: '' },
		photographerName: { type: String, default: 'Your Name' },
		phone: { type: String, default: '' },
		whatsapp: { type: String, default: '' },
		email: { type: String, default: 'your@gmail.com' },
		address: { type: String, default: '' },
		instagram: { type: String, default: '' },
		facebook: { type: String, default: '' },
		youtube: { type: String, default: '' },
		googleMaps: { type: String, default: '' },

		logoUrl: { type: String, default: '' },
		heroImageUrl: { type: String, default: '' },
		profilePhotoUrl: { type: String, default: '' },

		heroTitle: { type: String, default: 'Studio Name' },
		heroSubtitle: {
			type: String,
			default: 'Professional Studio Services',
		},
	},
	{ timestamps: true },
);

const Studio = mongoose.model('Studio', studioSchema);

export default Studio;