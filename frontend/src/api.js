import axios from 'axios';
import { DEBUG } from './config.js';

export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

const API = axios.create({
    baseURL: DEBUG ? "http://127.0.0.1:8000" : `https://django.clubchilien.xyz`,
    withCredentials : true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken',
});

API.interceptors.request.use((config) => {
    const token = getCookie('csrftoken');
    if (token) {
        config.headers['X-CSRFToken'] = token;
    }
    return config;
}); 

export default API;