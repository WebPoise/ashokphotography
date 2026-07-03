import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

dotenv.config();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.error('MongoDB connection error:', err));

const createSecondAdmin = async () => {
	try {
		// Check if user already exists
		const existingUser = await User.findOne({
			email: 'ashokphotography688@gmail.com',
		});
		if (existingUser) {
			console.log('User already exists');
			process.exit(0);
		}

		const newAdmin = new User({
			name: 'Ashok',
			email: 'ashokphotography688@gmail.com',
			password: 'Ashok@1234',
			isAdmin: true,
		});

		await newAdmin.save();
		console.log('Second admin user created successfully');
		process.exit(0);
	} catch (error) {
		console.error('Error:', error);
		process.exit(1);
	}
};

createSecondAdmin();
