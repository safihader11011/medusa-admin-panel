import axios from '../utilities/axios';
import cookies from '../utilities/cookies';

export let getPsychics = async () => {
    try {
        let token = cookies.getCookie('token');
        axios.defaults.headers['Authorization'] = 'Bearer ' + token;
        let response = await axios.get('/allpsychics');
        return response.data;
    } catch(err) {
        err.response.data.error = true;
        return err.response.data;
    }
}

export let verifyPsychic = async (id, registered) => {
    try {
        let token = cookies.getCookie('token');
        axios.defaults.headers['Authorization'] = 'Bearer ' + token;
        let response = await axios.put('/register/' + id, { registered });
        return response.data;
    } catch(err) {
        err.response.data.error = true;
        return err.response.data;
    }
}