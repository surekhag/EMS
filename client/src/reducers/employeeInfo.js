import {
  SET_ALL_EMPLOYEES,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  CLEAR_DELETE_EMPLOYEE_MESSAGE,
  SET_ALL_MANAGER,
  LOAD_MANAGER_ERROR
} from '../actions/actionTypes'

const initialState = {
  employeeData: null,
  deleteEmployeeSuccess: null,
  deleteEmployeeError: null,
  managers: null,
  loadManagerError: null
}
export default function employeeInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_EMPLOYEES:
      return {
        ...state,
        employeeData: action.payload.data
      }
    case SET_ALL_MANAGER:
      return {
        ...state,
        managers: action.payload.data
      }
    case LOAD_MANAGER_ERROR:
      return {
        ...state,
        loadManagerError: action.payload.data
      }
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        deleteEmployeeSuccess: action.payload.data
      }
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        deleteEmployeeError: action.payload.data
      }
    case CLEAR_DELETE_EMPLOYEE_MESSAGE:
      return {
        ...state,
        deleteEmployeeSuccess: null,
        deleteEmployeeError: null
      }
    default:
      return state
  }
}
