import { ADD_NEW_USER, SET_NEW_USER_SUCCESS, SET_NEW_USER_ERROR, CLEAR_USER_STATUS_MESSAGE, UPDATE_USER } from './actionTypes'

export function addNewUser(userInfo) {  
  return {
    type: ADD_NEW_USER,
    userInfo
  }
}
export function updateUser(userInfo, id) {  
  return {
    type: UPDATE_USER,
    payload :{userInfo, id}
  }
}

export function setNewUserSuccess(data) {
  return {
    type: SET_NEW_USER_SUCCESS,
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