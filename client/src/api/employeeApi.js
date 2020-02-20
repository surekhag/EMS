import axios from 'axios'
import { FETCH_EMPLOYEE_URL } from '../configurations/endPoints'

export function loadAllEmployeeData() {
    return axios.get(FETCH_EMPLOYEE_URL)
}
