import axios from 'axios'
import { FETCH_ALL_PROJECTS,DELETE_PROJECT_URL } from '../configurations/endPoints'

export function loadAllProjects() {
  return axios.get(FETCH_ALL_PROJECTS)
}

export function deleteProjectApi(id) {
  return axios.delete(DELETE_PROJECT_URL+id 
   )
}
