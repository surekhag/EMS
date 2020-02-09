import { LOGIN_TO_SITE, LOGIN_TO_SITE_SUCCESS } from './actionTypes'

export const loginToSite = (username, password, userrole) => {
    return {
        type: LOGIN_TO_SITE,
        payload: {
            username: username,
            password: password,
            userrole: userrole
        }
    }
}

export const loginToSiteSuccess = loginStatus => {
    return {
        type: LOGIN_TO_SITE_SUCCESS,
        loginStatus
    }
}
