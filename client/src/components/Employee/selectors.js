export function employeeDataSelector(state) {
  return state.EmployeeInfo.employeeData
}
export function addNewUserError(state) {
  return state.userReducer.error
}
export function addNewUserSuccess(state) {
  return state.userReducer.addNewUserStatus
}
export function updateUserStatusSuccess(state) {
  return state.userReducer.updateUserStatus
}
export function updateUserErrorMsg(state) {
  return state.userReducer.updateUserError
}
export function deleteEmployeeErrors(state) {
  return state.EmployeeInfo.deleteEmployeeError
}
export function deleteEmployeeSuccessMsg(state) {
  return state.EmployeeInfo.deleteEmployeeSuccess
}
