import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (email, password) => axios.post(`${API_URL}/auth/register`, { email, password });
export const login = (email, password) => axios.post(`${API_URL}/auth/login`, { email, password });
export const uploadPDF = (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_URL}/pdfs/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getPDFs = (token) => axios.get(`${API_URL}/pdfs`, {
    headers: { Authorization: `Bearer ${token}` },
});
export const addHighlight = (data, token) => axios.post(`${API_URL}/highlights`, data, {
    headers: { Authorization: `Bearer ${token}` },
});
export const getHighlights = (uuid, token) => axios.get(`${API_URL}/highlights/${uuid}`, {
    headers: { Authorization: `Bearer ${token}` },
});
