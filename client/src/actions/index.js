import {
    LOAD_ALL_STATES_SAGA,
    LOAD_ALL_EMPLOYEE_SAGA,
    SET_ALL_STATES,
    SET_ALL_EMPLOYEES
} from './actionTypes'

// Load and Set States with City
export function loadAllStatesData() {
    return {
        type: LOAD_ALL_STATES_SAGA,
        payload: {}
    }
}
export function setAllStatesData(data) {
    return {
        type: SET_ALL_STATES,
        payload: { data }
    }
}

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
