import {
  FETCH_ALL_PROJECTS_SAGA,
  SET_ALL_PROJECTS,
  SET_ALL_PROJECTS_ERROR
} from './actionTypes'

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
