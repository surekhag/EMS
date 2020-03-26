import {
  LOAD_ALL_EMPLOYEE_SAGA,
  SET_ALL_EMPLOYEES,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  CLEAR_DELETE_EMPLOYEE_MESSAGE,
  LOAD_ALL_MANAGER_SAGA,
  SET_ALL_MANAGER,
  LOAD_MANAGER_ERROR,
 LOAD_ACTIVE_EMPLOYEES,
 LOAD_ACTIVE_EMPLOYEES_ERROR,
 SET_ACTIVE_EMPLOYEES
} from './actionTypes'

// Load and Set Employee Data
export function loadAllEmployeeData(data) {
  console.log('action', data)
  return {
    type: LOAD_ALL_EMPLOYEE_SAGA,
    payload : {data}
  }
}
export function loadActiveEmployeeData() {
  return {
    type: LOAD_ACTIVE_EMPLOYEES,
  }
}
export function setActiveEmployeeData(info) {
  const data = info.data.data
  return {
    type: SET_ACTIVE_EMPLOYEES,
    payload: { data }
  }
}

export function loadActiveEmployeeError(data) {
  return {
    type: LOAD_ACTIVE_EMPLOYEES_ERROR,
    payload: { data }
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

export function loadManagers() {
  return {
    type: LOAD_ALL_MANAGER_SAGA
  }
}
export function setManagers(data) {
  return {
    type: SET_ALL_MANAGER,
    payload: { data }
  }
}
export function setManagerError(e) {
  return {
    type: LOAD_MANAGER_ERROR,
    payload: { e }
  }
}