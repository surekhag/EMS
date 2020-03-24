import {
  SET_NEW_USER_SUCCESS,
  SET_NEW_USER_ERROR,
  CLEAR_USER_STATUS_MESSAGE,
  SET_UPDATE_USER_SUCCESS,
  SET_UPDATE_USER_ERROR
} from '../actions/actionTypes'

const initialState = {
  addNewUserStatus: null,
  error: null,
  updateUserStatus: null,
  updateUserError: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_USER_SUCCESS:
      return {
        ...state,
        addNewUserStatus: action.data
      }

    case SET_NEW_USER_ERROR:
      return {
        ...state,
        error: action.data
      }
    case SET_UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserStatus: action.data
      }
    case SET_UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserError: action.data
      }
    case CLEAR_USER_STATUS_MESSAGE:
      return {
        ...state,
        addNewUserStatus: null,
        updateUserStatus: null,
        error: null,
        updateUserError: null
      }
    default:
      return state
  }
}

export default userReducer
