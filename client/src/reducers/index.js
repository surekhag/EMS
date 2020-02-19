import { combineReducers } from 'redux'
import EmployeeInfo from './employeeInfo'
import loginReducer from './loginReducer'
import peerReviewReducer from './peerReviewReducer'

export default combineReducers({
    EmployeeInfo,
    loginReducer,
    peerReviewReducer
})
