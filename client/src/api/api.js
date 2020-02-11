import axios from 'axios'
import { STATES_URL, EMPLOYEE_URL } from '../configurations/config'

export function loadAllStatesData() {
    // const getMenuApi =`${BASE_URL}/` +'api/user';
    return axios.get(STATES_URL)
}

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });
export function loadAllEmployeeData() {
    return axios.get(EMPLOYEE_URL);
}
