import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with actual base URL

export async function signupUser(data: { name: string, email: string, password: string }) {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
        console.log(response);
        return response.data.token;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Signup failed');
    }
}

export async function loginUser(data: { email: string, password: string }) {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, data);
        return response.data.token;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
}

export function saveTokenToLocalStorage(token: string) {
    localStorage.setItem('token', token);
}

export function clearTokenFromLocalStorage() {
    localStorage.removeItem('token');
}

export function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
}
