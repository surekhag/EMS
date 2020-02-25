import axios from 'axios'
import {ADD_NEW_USER_URL} from '../configurations/endPoints'

export function addNewUserApi(data) {    
  const reqBody = data.userInfo;
  return axios.post(ADD_NEW_USER_URL, reqBody)
}
