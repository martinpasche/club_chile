import axios from 'axios';

// CSRF_COOKIE_NAME = "XSRF-TOKEN"
// axios.defaults.xsrfCookieName = 'csrftoken';
//axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
//axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: `https://django.clubchilien.xyz`,
    withCredentials : true,
    //xsrfHeaderName: 'X-CSRFToken',
    ///xsrfCookieName: 'csrftoken',
});