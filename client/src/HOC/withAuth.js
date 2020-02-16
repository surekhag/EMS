import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../context-provider/user-context'

const withAuth = WrappedComponent => props => {
    const { currentUser } = useContext(UserContext)

    //check if user is logged in
    // if user is not logged in, redirect to login page
    return currentUser ? (
        <WrappedComponent {...props} />
    ) : (
        <Redirect to="/login"></Redirect>
    )
}
export default withAuth
