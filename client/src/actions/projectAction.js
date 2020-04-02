import {
  FETCH_ALL_PROJECTS_SAGA,
  SET_ALL_PROJECTS,
  DELETE_PROJECT,
  CLEAR_PROJECT_STATUS_MESSAGE,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_SUCCESS,
  ADD_NEW_PROJECT,
  UPDATE_PROJECT,
  SET_NEW_PROJECT_SUCCESS,
  SET_NEW_PROJECT_ERROR,
  SET_UPDATE_PROJECT_SUCCESS,
  SET_UPDATE_PROJECT_ERROR,
  SET_ALL_PROJECTS_ERROR,
  ALLOCATE_PROJECT,
  UPDATE_PROJECT_ALLOCATION,
  SET_ALLOCATE_PROJECT_SUCCESS,
  SET_ALLOCATE_PROJECT_ERROR,
  CLEAR_PROJECT_ALLOCATION_MESSAGE,
  GET_PROJECT_ALLOCATION_DATA,
  SET_PROJECT_ALLOCATION_DATA
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

export function addNewProject(userInfo) {
  return {
    type: ADD_NEW_PROJECT,
    userInfo
  }
}

export function updateProject(userInfo, id) {
  return {
    type: UPDATE_PROJECT,
    payload: { userInfo, id }
  }
}
export function updateProjectAllocation(userInfo, id) {
  return {
    type: UPDATE_PROJECT_ALLOCATION,
    payload: { userInfo, id }
  }
}
export function setNewProjectSuccess(data) {
  return {
    type: SET_NEW_PROJECT_SUCCESS,
    data
  }
}

export function setNewProjectError(data) {
  return {
    type: SET_NEW_PROJECT_ERROR,
    data
  }
}

export function setUpdateProjectSuccess(data) {
  return {
    type: SET_UPDATE_PROJECT_SUCCESS,
    data
  }
}
export function setUpdateProjectError(data) {
  return {
    type: SET_UPDATE_PROJECT_ERROR,
    data
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
    type: CLEAR_PROJECT_STATUS_MESSAGE
  }
}

export function clearProjectAllocationMsg() {
  return {
    type: CLEAR_PROJECT_ALLOCATION_MESSAGE
  }
}

export function setAllocateProjectSuccess(data) {
  return {
    type: SET_ALLOCATE_PROJECT_SUCCESS,
    data
  }
}
export function setAllocateProjectError(data) {
  return {
    type: SET_ALLOCATE_PROJECT_ERROR,
    data
  }
}

export function allocateProject(userInfo) {
  return {
    type: ALLOCATE_PROJECT,
    userInfo
  }
}

export function getProjectAllocationData(id) {
  return {
    type: GET_PROJECT_ALLOCATION_DATA,
    payload: { id }
  }
}
export function setProjectAllocationData(data) {
  return {
    type: SET_PROJECT_ALLOCATION_DATA,
    data
  }
}