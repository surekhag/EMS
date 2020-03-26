import axios from 'axios'
import {
  FETCH_EMPLOYEE_URL,
  FETCH_MANAGER_URL,
  USER_URL
} from '../configurations/endPoints'

export function loadAllEmployeeData(data) {
  console.log('api', data)
  return axios.get(FETCH_EMPLOYEE_URL)
}
export function loadManagers() {
  return axios.get(FETCH_MANAGER_URL)
}

export function deleteEmployeeApi(id) {
  return axios.delete(USER_URL + id)
}
export function loadActiveEmployeeApi(data) {
  return axios.get(FETCH_EMPLOYEE_URL+ data)
}
