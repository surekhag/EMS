import { LOGIN_TO_SITE_SUCCESS,LOGIN_TO_SITE_ERROR } from '../actions/actionTypes.js'

const initialState = {
    currentUser : null,
    error : null,   
}

const loginReducer = (state = initialState, action) => {    
    switch (action.type) {
        case LOGIN_TO_SITE_SUCCESS: 
            return {               
                currentUser: action.payload.userInfo.user,
                error : null               
            }

        case LOGIN_TO_SITE_ERROR:         
            return{
                ...state,
                error : action.message
            }
        default:
            return state
    }
}

export default loginReducer
