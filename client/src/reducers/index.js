import { combineReducers } from 'redux'
import EmployeeInfo from './employeeInfo'
import loginReducer from './loginReducer'
import peerReviewReducer from './peerReviewReducer'
import projectReducer from './projectReducer'
import userReducer from './userReducer'

export default combineReducers({
  EmployeeInfo,
  loginReducer,
  peerReviewReducer,
  projectReducer,
  userReducer
})
