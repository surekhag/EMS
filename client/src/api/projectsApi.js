import axios from 'axios'
import {
  FETCH_ALL_PROJECTS,
  ADD_NEW_PROJECT_URL,
  ALLOCATE_NEW_PROJECT_URL,
  PROJECT_URL
} from '../configurations/endPoints'

export function loadAllProjectsApi() {
  return axios.get(FETCH_ALL_PROJECTS)
}

export function deleteProjectApi(id) {
  return axios.delete(PROJECT_URL + id)
}

export function addNewProjectApi(data) {
  const reqBody = data.userInfo
  return axios.post(ADD_NEW_PROJECT_URL, reqBody)
}
export function updateProjectApi(payload) {
  const { userInfo, id } = payload
  return axios.put(PROJECT_URL + id, userInfo)
}

export function allocateProjectApi(data) {
  const reqBody = data.userInfo
  return axios.post(ALLOCATE_NEW_PROJECT_URL, reqBody)
}
