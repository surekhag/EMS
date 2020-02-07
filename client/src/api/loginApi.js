import axios from 'axios';
import {
  LOGIN_URL  
} from '../configurations/config';


export function logInToSiteApi(username, password) {   
  const reqBody = {
    email: username,
    password: password
  };
  const headerData = {
    'Content-Type' : 'application/json',    
  }

  return axios.post(LOGIN_URL,JSON.stringify(reqBody), {
    headers: headerData
  });
}
