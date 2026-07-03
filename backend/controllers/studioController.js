import Studio from '../models/studioModel.js';

export const getStudio = async (req, res) => {
	try {
		let studio = await Studio.findOne();

		if (!studio) {
			studio = await Studio.create({});
		}

		res.status(200).json({
			success: true,
			studio,
		});
	} catch (error) {
		console.error('Error fetching studio settings:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};

export const updateStudio = async (req, res) => {
	try {
		let studio = await Studio.findOne();

		if (!studio) {
			studio = await Studio.create(req.body);
		} else {
			studio = await Studio.findByIdAndUpdate(studio._id, req.body, {
				new: true,
			});
		}

		res.status(200).json({
			success: true,
			message: 'Studio settings updated successfully',
			studio,
		});
	} catch (error) {
		console.error('Error updating studio settings:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};