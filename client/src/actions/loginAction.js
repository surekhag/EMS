import {
    LOGIN_TO_SITE,
    LOGIN_TO_SITE_SUCCESS,
    USER_ATHENTICATION
} from './actionTypes'

export const loginToSite = (username, password) => {
    return {
        type: LOGIN_TO_SITE,
        payload: {
            username: username,
            password: password
        }
    }
}

export const loginToSiteSuccess = loginStatus => {
    return {
        type: LOGIN_TO_SITE_SUCCESS,
        loginStatus
    }
}

export const userAuthentication = () => {
    return {
        type: USER_ATHENTICATION
    }
}
