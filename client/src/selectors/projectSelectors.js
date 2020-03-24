export function projectSelector(state) {
  return state.projectReducer.projects
}

export function newProjectAddError(state) {
  return state.projectReducer.error
}

export function addNewProjectStatusMsg(state) {
  return state.projectReducer.addNewProjectStatus
}
export function updateProjectStatusMsg(state) {
  return state.projectReducer.updateProjectStatus
}
export function updateProjectErrorMsg(state) {
  return state.projectReducer.updateProjectError
}

export function deleteProjectSuccessMsg(state) {
  return state.projectReducer.deleteProjectSuccess
}

export function deleteProjectErrorMsg(state) {
  return state.projectReducer.deleteProjectError
}
