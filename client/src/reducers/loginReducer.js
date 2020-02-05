import {
    LOGIN_TO_SITE_SUCCESS,
    LOGIN_TO_SITE_ERROR
  } from '../constants'
  
  const initialState ={
      loginStatus : null,
      loginError : null
  }
  export default function setBrowserInfo(state = initialState, action) {
      console.log(action);
      switch (action.type) {
        case LOGIN_TO_SITE_SUCCESS:
          return {
            ...state,
           // code for status update
           //loginStatus :
          };
           case LOGIN_TO_SITE_ERROR:
          return {
            ...state,
           // code for status update
           //loginError:
          };         
        default:
          return state;
      }
    }