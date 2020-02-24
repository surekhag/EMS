import { combineReducers } from 'redux'
import EmployeeInfo from './employeeInfo'
import loginReducer from './loginReducer'
import peerReviewReducer from './peerReviewReducer'
import projectReducer from './projectReducer'

export default combineReducers({
  EmployeeInfo,
  loginReducer,
  peerReviewReducer,
  projectReducer
})
