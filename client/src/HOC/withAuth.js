import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../context-provider/user-context'
import {getToken} from '../helpers/auth';
import { useDispatch } from 'react-redux';
import {authenticateUserSession} from '../actions/loginAction'
import interceptors from '../helpers/interceptors';

const withAuth = WrappedComponent => props => {
    const { currentUser } = useContext(UserContext)
    const dispatch = useDispatch();
    //check if user is logged in
    // if user is not logged in, redirect to login page
    
   
    useEffect(() => {    
        interceptors();    
        if(!currentUser){        
            if(getToken()){                                
                dispatch(authenticateUserSession());
            }    
        }
    }, []);


    return currentUser ? (
        <WrappedComponent {...props} />
    ) : (
        <Redirect to="/login"></Redirect>
    )
}
export default withAuth
