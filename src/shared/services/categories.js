import axios from '../utilities/axios';

export let getAllCategories = async () => {
    try {
        let response = await axios.get('/categories');
        return response.data;
    } catch(err) {
        err.response.data.error = true;
        return err.response.data;
    }
}