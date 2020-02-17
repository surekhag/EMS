import { SET_ALL_EMPLOYEES } from '../actions/actionTypes.js'

const initialState = {
    EmployeeData: null
}
export default function setBrowserInfo(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_EMPLOYEES:
            return {
                ...state,
                EmployeeData: action.payload.data
            }
        default:
            return state
    }
}
