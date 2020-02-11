import axios from 'axios'
import { EMPLOYEE_URL } from '../configurations/End-Points'


export function loadAllEmployeeData() {
    return axios.get(EMPLOYEE_URL)
}
