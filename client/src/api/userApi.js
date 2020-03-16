import axios from 'axios'
import { ADD_NEW_USER_URL, UPDATE_USER_URL } from '../configurations/endPoints'

export function addNewUserApi(data) {
  const reqBody = data.userInfo
  return axios.post(ADD_NEW_USER_URL, reqBody)
}

export function updateUserApi(payload) {
  const { userInfo, id } = payload
  return axios.put(UPDATE_USER_URL + id, userInfo)
}
