import axios from 'axios';

const API_URL =
	process.env.REACT_APP_API_URL ||
	'https://mallikarjunaphotography-backend.onrender.com';

export const API = axios.create({
	baseURL: API_URL,
	timeout: 20000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

API.interceptors.request.use(
	(config) => {
		const token =
			localStorage.getItem('token') || localStorage.getItem('authToken');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

API.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('API Error:', {
			url: error.config?.url,
			baseURL: error.config?.baseURL,
			message: error.message,
			status: error.response?.status,
		});

		if (error.response?.status === 401) {
			localStorage.removeItem('token');
			localStorage.removeItem('authToken');
			localStorage.removeItem('userInfo');
		}

		return Promise.reject(error);
	},
);

export const getConnectionStatus = () => {
	return {
		isConnectionIssue: false,
		useFallbackURL: false,
		isOfflineMode: false,
	};
};

export const diagnoseBrokenConnections = async () => {
	return {
		results: {
			api: {
				status: 'reachable',
				error: null,
			},
		},
		recommendations: [],
		timestamp: new Date().toISOString(),
	};
};

export const fetchImagesWithCache = async () => {
	const response = await API.get('/images');
	return response.data;
};

export const fetchWithCache = async (endpoint) => {
	const response = await API.get(endpoint);
	return response.data;
};

export const getCloudFrontUrl = (url) => url;
export const getOptimizedImageUrl = (url) => url;
export const checkWebPSupport = () => {};

export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common.Authorization;
	}
};

export const fetchImages = () => API.get('/images');

export const uploadImage = (formData) =>
	API.post('/images', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const loginUser = (loginData) => API.post('/users/login', loginData);

export const deleteImage = (imageId) => API.delete(`/images/${imageId}`);

export default API;