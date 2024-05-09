import axios from 'axios';


// axios.defaults.xsrfCookieName = 'csrftoken';
//axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
//axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: `https://django.clubchilien.xyz`,
    withCredentials : true,
    //xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken',
});