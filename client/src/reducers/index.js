import { combineReducers } from 'redux'
import EmployeeInfo from './EmployeeInfo'
import loginReducer from './loginReducer'

export default combineReducers({
    EmployeeInfo,
    loginReducer
})
