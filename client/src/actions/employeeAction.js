import {
  LOAD_ALL_EMPLOYEE_SAGA,
  SET_ALL_EMPLOYEES,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  CLEAR_DELETE_EMPLOYEE_MESSAGE
} from './actionTypes'

// Load and Set Employee Data
export function loadAllEmployeeData() {
  return {
    type: LOAD_ALL_EMPLOYEE_SAGA
  }
}
export function setAllEmployeeData(info) {
  const data = info.data.data
  return {
    type: SET_ALL_EMPLOYEES,
    payload: { data }
  }
}

export function deleteEmployee(id) {
  return {
    type: DELETE_EMPLOYEE,
    payload: { id }
  }
}

export function deleteEmployeeSuccess(data) {
  return {
    type: DELETE_EMPLOYEE_SUCCESS,
    payload: { data }
  }
}

export function deleteEmployeeError(data) {
  return {
    type: DELETE_EMPLOYEE_ERROR,
    payload: { data }
  }
}

export function clearDeleteEmployeeMsg() {
  return {
    type: CLEAR_DELETE_EMPLOYEE_MESSAGE
  }
}
