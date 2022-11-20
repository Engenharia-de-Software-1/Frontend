import axios from 'axios'

let token = null;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use(
  async config => {
    let token = localStorage.getItem('@agroi9:token')
    if(token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; 
  },
  error => {
    Promise.reject(error)
});


export default api;