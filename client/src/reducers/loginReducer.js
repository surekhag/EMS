import { LOGIN_TO_SITE_SUCCESS } from '../actions/actionTypes.js'

const initialState = {
    loginStatus: {
        userData: null,
        status: null,
        message: null
    }
}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_TO_SITE_SUCCESS:
            const userData = action.loginStatus.data
            let userInfo = null
            if (userData.status === 'success') {
                localStorage.setItem('token', userData.data.token)
                userInfo = userData.data.user
            } else userInfo = userData.data

            return {
                loginStatus: {
                    currentUser: userInfo,
                    status: userData.status,
                    message: userData.message
                },
                currentUser: userInfo
            }
        default:
            return state
    }
}

export default loginReducer
