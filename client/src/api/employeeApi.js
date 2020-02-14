import axios from 'axios'
import { EMPLOYEE_URL } from '../configurations/endPoints'


export function loadAllEmployeeData() {
    return axios.get(EMPLOYEE_URL)
}
