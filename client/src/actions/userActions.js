import { ADD_NEW_USER, SET_NEW_USER, SET_NEW_USER_ERROR, CLEAR_USER_STATUS_MESSAGE } from './actionTypes'

export function addNewUser(userInfo) {  
  return {
    type: ADD_NEW_USER,
    userInfo
  }
}

export function setNewUserSuccess(data) {
  return {
    type: SET_NEW_USER,
    data
  }
}

export function setNewUserError(data) {  
  return {
    type: SET_NEW_USER_ERROR,
   data
  }
}

export function clearUserStatus() {  
  return {
    type: CLEAR_USER_STATUS_MESSAGE,   
  }
}