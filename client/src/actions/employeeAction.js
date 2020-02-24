import { LOAD_ALL_EMPLOYEE_SAGA, SET_ALL_EMPLOYEES } from './actionTypes'

// Load and Set Employee Data
export function loadAllEmployeeData() {
  return {
    type: LOAD_ALL_EMPLOYEE_SAGA,
    payload: {}
  }
}
export function setAllEmployeeData(data) {
  return {
    type: SET_ALL_EMPLOYEES,
    payload: { data }
  }
}
