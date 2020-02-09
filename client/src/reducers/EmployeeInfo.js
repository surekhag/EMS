import { SET_ALL_EMPLOYEES } from '../constants'

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
        // case CLEAR_USER:
        //   localStorage.removeItem('user');
        //   return {
        //     ...state,
        //     userData: null,
        //   };
        default:
            return state
    }
}
