import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../context-provider/user-context'
import { getToken } from '../helpers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUserSession } from '../actions/loginAction'
import interceptors from '../helpers/interceptors'
import Loader from 'react-loader-spinner'

const withAuth = WrappedComponent => props => {
  const { currentUser } = useContext(UserContext)
  const dispatch = useDispatch()
  // check if user is logged in
  // if user is not logged in, redirect to login page
  const isLoading = useSelector(state => state.loginReducer.isLoading)

  useEffect(() => {
    interceptors()
    if (!currentUser) {
      if (getToken()) {
        dispatch(authenticateUserSession())
      }
    }
  }, [])

  return isLoading ? (
    <Loader
      type="Oval"
      style={{ textAlign: 'center' }}
      color="#00BFFF"
      height={100}
      width={100}
      // timeout={10000} //3 secs
    />
  ) : currentUser ? (
    <WrappedComponent {...props} />
  ) : (
    <Redirect to="/login"></Redirect>
  )
}
export default withAuth
