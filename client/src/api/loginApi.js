import axios from 'axios';
import {
  LOGIN_URL  
} from '../configurations/config';


export function logInToSiteApi() { 
   return axios.get( LOGIN_URL );
}
