import axios from 'axios';
import {
  LOGIN_URL  
} from '../configurations/config';


export function logInToSiteApi(username, password) { 
  console.log(username,password, LOGIN_URL);
  const reqBody = {
    email: username,
    password: password
  };
  const headerData = {
    // 'Content-Type' : 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    // 'Access-Control-Allow-Credentials':'true'
    'Content-Type': 'multipart/form-data'
  }

  // "headers": { "accept":"application/json, text/plain, /" , "accept-language":"en-GB,en-US;q=0.9,en;q=0.8", "authorization":"Bearer YWRtaW46YWRtaW4=","content-type":"application/json","withcredentials":"true"},


console.log(reqBody);
    // return axios.post(LOGIN_URL, reqBody, headerData);
  //  return axios.post(LOGIN_URL,{reqBody : JSON.stringify(reqBody)}, headerData);
   return axios.post(LOGIN_URL,JSON.stringify(reqBody), headerData);

  //  return axios.post(LOGIN_URL,{
  //   email: username,
  //   password: password
  // }, headerData);
}
