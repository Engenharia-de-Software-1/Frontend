import axios from 'axios'

let token = null;

if (typeof window !== 'undefined') {
  token = localStorage.getItem('token')
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  }
});


export default api;