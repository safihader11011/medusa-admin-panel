import axios from 'axios';
import config from '../config/dev';

const instance = axios.create({
    baseURL: config.HOST,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default instance;