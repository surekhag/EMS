import { LOGIN_TO_SITE_SUCCESS } from '../constants'

const initialState = {
    loginStatus: {
        currentUser: null,
        status: null,
        message: null
    }
}
export default function setBrowserInfo(state = initialState, action) {
    switch (action.type) {
        case LOGIN_TO_SITE_SUCCESS:
            const userData = action.loginStatus.data
            let userInfo
            if (userData.status == 'success') {
                localStorage.setItem(
                    'token',
                    userData.data.token
                )
                userInfo = userData.data.user
            } else userInfo = userData.data

            return {
                loginStatus: {
                    currentUser: userInfo,
                    status: userData.status,
                    message: userData.message
                }
            }
        default:
            return state
    }
}
