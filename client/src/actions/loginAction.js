import {
  LOGIN_TO_SITE,
  LOGIN_TO_SITE_SUCCESS,
  USER_ATHENTICATION,
  LOGIN_TO_SITE_ERROR,
  SESSION_EXPIRED
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
    payload: {
      userInfo: loginStatus.data.data,
      message: loginStatus.data.message
    }
  }
}

export const loginToSiteError = message => {
  return {
    type: LOGIN_TO_SITE_ERROR,
    message
  }
}

export const authenticateUserSession = () => {
  return {
    type: USER_ATHENTICATION
  }
}

export const sessionExpired = () => {
  return {
    type: SESSION_EXPIRED
  }
}
