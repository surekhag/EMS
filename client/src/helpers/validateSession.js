import axios from 'axios'
import {Redirect} from 'react-router-dom';
import {AUTH_URL} from '../configurations/config';

const validateSession = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const options = {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          };
axios.get(AUTH_URL, options)
.then(
    res =>{                
        return true;
    },
    (error) => {
        console.log( error.response);        
        if(error.response.status ==401 && error.response.data.message == "Invalid Token"){                
                if(window.location.pathname != '/login'){                    
                    return false;
                }
               
        }   
    }
)
    }
}
export default validateSession
