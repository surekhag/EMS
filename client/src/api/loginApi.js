import axios from 'axios'
import { LOGIN_URL } from '../configurations/endPoints'

export function logInToSiteApi(userName, password) {
    const reqBody = {
        userName: userName,
        password: password
    }
    return axios.post(LOGIN_URL, reqBody)
}
