import { combineReducers } from 'redux'
import StateInfo from './StateInfo'
import EmployeeInfo from './EmployeeInfo'
import loginReducer from './loginReducer'

export default combineReducers({
    StateInfo,
    EmployeeInfo,
    loginReducer
})
