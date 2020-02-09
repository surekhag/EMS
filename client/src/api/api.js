import axios from 'axios'
import { STATES_URL, EMPLOYEE_URL } from '../configurations/config'

export function loadAllStatesData() {
    // const getMenuApi =`${BASE_URL}/` +'api/user';
    return axios.get(STATES_URL)
}
export function loadAllEmployeeData() {
    // const getMenuApi =`${BASE_URL}/` +'api/user';
    return axios.get(EMPLOYEE_URL)
}
