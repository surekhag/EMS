import axios from 'axios'
import { FETCH_ALL_PROJECTS } from '../configurations/endPoints'

export function loadAllProjects() {
    return axios.get(FETCH_ALL_PROJECTS)
}

