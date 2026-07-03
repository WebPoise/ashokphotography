import mongoose from 'mongoose';

const imageSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		tags: [String],
		order: { type: Number, default: 0 },

		isStudioAsset: {
			type: Boolean,
			default: false,
		},
		studioAssetType: {
			type: String,
			enum: ['logo', 'hero', 'profile', 'none'],
			default: 'none',
		},
	},
	{
		timestamps: true,
	},
);

const Image = mongoose.model('Image', imageSchema);

export default Image;