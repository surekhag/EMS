import {LOGIN_TO_SITE, LOGIN_TO_SITE_SUCCESS} from '../constants';

export const loginToSite =(username, password)=>{
    return {
        type : LOGIN_TO_SITE,
        payload :{
            username : username,
            password : password
        }
    }
  }

  export const loginToSiteSuccess =(loginStatus)=>{
    return {
        type : LOGIN_TO_SITE_SUCCESS,
        loginStatus    
    }
  }