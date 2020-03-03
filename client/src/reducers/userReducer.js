import {
    ADD_NEW_USER, SET_NEW_USER,SET_NEW_USER_ERROR, CLEAR_USER_STATUS_MESSAGE
  } from '../actions/actionTypes.js'
  
  const initialState = {
    addNewUserStatus: null,
    error: null,    
  }
  
  const userReducer = (state = initialState, action) => {      
    switch (action.type) {
      case SET_NEW_USER:
        return {
          ...state,
          addNewUserStatus : action.data          
        }
  
      case SET_NEW_USER_ERROR:        
        return {
          ...state,
          error : action.data
        
        }
        case CLEAR_USER_STATUS_MESSAGE :
          console.log("CLEAR_ERROR_MESSAGE");
          return {
            ...state,
            addNewUserStatus : null
          }
      default:
        return state
    }
  }
  
  export default userReducer
  