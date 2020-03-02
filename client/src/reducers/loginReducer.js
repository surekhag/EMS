import {
  LOGIN_TO_SITE_SUCCESS,
  LOGIN_TO_SITE_ERROR,
  SESSION_EXPIRED,
  LOGOUT_FROM_SITE
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
      case SESSION_EXPIRED:        
        return {
          ...state,
          isLoading: false,
          currentUser: null,
          error: "Session has been expired! Please try again. ",
        }
        case LOGOUT_FROM_SITE:          
          return{
            ...state,
            currentUser: null,
            error: null,
            isLoading: false
          }
    default:
      return state
  }
}

export default loginReducer
