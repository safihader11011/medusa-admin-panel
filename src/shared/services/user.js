import axios from '../utilities/axios';
import cookies from '../utilities/cookies';

export let signUp = async (credentials) => {
    try {
        let response = await axios.post('/admin/register', credentials);
        return response.data;
    } catch(err) {
        err.response.data.error = true;
        return err.response.data;
    }
}

export let verifyOtp = async (credentials) => {
    try {
        let response = await axios.post('/admin/verifyOtp', credentials);

        if(response.data.message === 'Login successfully.') {
            cookies.setCookie('token', response.data.data.token)
        }

        return response.data;
    } catch(err) {
        err.response.data.error = true;
        return err.response.data;
    }
}

export let resendOtp = async (credentials) => {
    try {
        let response = await axios.post('/admin/resendOtp', credentials);
        return response.data;
    } catch(err) {
        err.response.data.error = true;
        return err.response.data;
    }
}

export let signIn = async (credentials) => {
    try {
        let response = await axios.post('/admin/signin', credentials);

        console.log(response.data)
        if(response.data.token) {
            cookies.setCookie('token', response.data.token, response.data.expiresIn);
        }

        return response.data;
    } catch(err) {
        err.response.data.error = true;
        return err.response.data;
    }
}

export let checkSignIn = () => {
    return cookies.getCookie('token') ? true: false;
}

export let signOut = () => {
    cookies.deleteCookie('token');
    cookies.deleteCookie('name');
}

export let getSignedInUser = async () => {
    try {
        let token = cookies.getCookie('token');
        axios.defaults.headers['Authorization'] = 'Bearer ' + token;
        let response = await axios.get('/users/me');
        return response.data;
    } catch(err) {
        console.log(err.response);
        err.response.data.error = true;
        return err.response.data;
    }
}
