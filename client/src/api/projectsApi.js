import axios from 'axios'
import {
  FETCH_ALL_PROJECTS,
  DELETE_PROJECT_URL,
  ADD_NEW_PROJECT_URL,
  UPDATE_PROJECT_URL
} from '../configurations/endPoints'

export function loadAllProjectsApi() {
  return axios.get(FETCH_ALL_PROJECTS)
}

export function deleteProjectApi(id) {
  return axios.delete(DELETE_PROJECT_URL + id)
}

export function addNewProjectApi(data) {
  const reqBody = data.userInfo
  return axios.post(ADD_NEW_PROJECT_URL, reqBody)
}

export function updateProjectApi(payload) {
  const { userInfo, id } = payload
  return axios.put(UPDATE_PROJECT_URL + id, userInfo)
}
