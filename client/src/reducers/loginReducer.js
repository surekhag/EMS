import {
  LOGIN_TO_SITE_SUCCESS,
  LOGIN_TO_SITE_ERROR
} from '../actions/actionTypes.js'

const initialState = {
  currentUser: null,
  error: null,
  isLoading: true
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_TO_SITE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.userInfo.user,
        isLoading: false,
        error: null
      }

    case LOGIN_TO_SITE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.message
      }
    default:
      return state
  }
}

export default loginReducer
