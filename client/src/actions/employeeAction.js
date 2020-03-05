import { LOAD_ALL_EMPLOYEE_SAGA, SET_ALL_EMPLOYEES, DELETE_EMPLOYEE } from './actionTypes'

// Load and Set Employee Data
export function loadAllEmployeeData() {
  return {
    type: LOAD_ALL_EMPLOYEE_SAGA,
  }
}
export function setAllEmployeeData(data) {
  return {
    type: SET_ALL_EMPLOYEES,
    payload: { data }
  }
}

export function deleteEmployee(id) {
  console.log(id);
  return {
    type: DELETE_EMPLOYEE,
    payload: { id }
  }
}
