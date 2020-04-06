export function currentUser(state) {
  return state.loginReducer.currentUser
}
export function loginError(state) {
  return state.loginReducer.error
}
