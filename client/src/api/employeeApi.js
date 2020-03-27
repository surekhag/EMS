import axios from 'axios'
import {
  FETCH_EMPLOYEE_URL,
  FETCH_MANAGER_URL,
  DELETE_USER_URL
} from '../configurations/endPoints'

export function loadAllEmployeeData() {
  return axios.get(FETCH_EMPLOYEE_URL)
}
export function loadManagers() {
  return axios.get(FETCH_MANAGER_URL)
}

export function deleteEmployeeApi(id) {
  return axios.delete(DELETE_USER_URL + id)
}
