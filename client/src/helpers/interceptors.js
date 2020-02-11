import axios from "axios";


const Interceptors = (token) => {
    axios.interceptors.request.use(
        config => {
            config.headers['Authorization'] = 'Bearer ' + token;
        return config;
        },
        error => {
            Promise.reject(error)
        });
}
export default Interceptors;
