import { LOGIN_TO_SITE_SUCCESS } from '../actions/actionTypes.js'

const initialState = {
    loginStatus: null
}
export default function setBrowserInfo(state = initialState, action) {
    switch (action.type) {
        case LOGIN_TO_SITE_SUCCESS:
            console.log(action.loginStatus.data)
            return {
                ...state,
                loginStatus: action.loginStatus.data
            }

        default:
            return state
    }
}
