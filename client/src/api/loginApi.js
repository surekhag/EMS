import axios from 'axios'
import { LOGIN_URL } from '../configurations/config'

export function logInToSiteApi(userName, password, userRole) {
    const reqBody = {
        userName: userName,
        password: password,
        userRole: userRole
    }
    // const headerData = {
    //   "Content-Type": "application/json"
    // };

    return axios.post(LOGIN_URL, reqBody)
}
