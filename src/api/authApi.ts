import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const authApi = {
  register: async (email: string, password: string, name?: string) => {
    const res = await axios.post(`${API_URL}/auth/register`, { email, password, name });
    return res.data;
  },
  login: async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
  },
};