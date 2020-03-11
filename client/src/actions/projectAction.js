import { FETCH_ALL_PROJECTS_SAGA, SET_ALL_PROJECTS, SET_ALL_PROJECTS_ERROR, DELETE_PROJECT,CLEAR_PROJECT_STATUS_MESSAGE, DELETE_PROJECT_ERROR,DELETE_PROJECT_SUCCESS } from './actionTypes'

export function loadAllProjects() {
  return {
    type: FETCH_ALL_PROJECTS_SAGA,
    payload: {}
  }
}
export function setAllProjectsData(data) {
  return {
    type: SET_ALL_PROJECTS,
    payload: { data }
  }
}


export function setAllProjectsDataError(data) {
  return {
    type: SET_ALL_PROJECTS_ERROR,
    payload: { data }
  }
}


export function deleteProject(id) {  
  return {
    type: DELETE_PROJECT,
    payload: { id }
  }
}

export function deleteProjectSuccess(data) {  
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: { data }
  }
}

export function deleteProjectError(data) {  
  return {
    type: DELETE_PROJECT_ERROR,
    payload: { data }
  }
}

export function clearProjectMsg() {
  return {
    type: CLEAR_PROJECT_STATUS_MESSAGE,
    
  }
}
