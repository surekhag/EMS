import { SET_ALL_EMPLOYEES } from '../actions/actionTypes.js'

const initialState = {
  employeeData: null
}
export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_EMPLOYEES:
      return {
        ...state,
        employeeData: action.payload.data
      }
    default:
      return state
  }
}
