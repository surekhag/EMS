import axios from 'axios'
import { getToken } from './auth'
const interceptors = () => {
  


  const token = localStorage.getItem('token')
  console.log('getToken ininterceptro', getToken())
  console.log('token interceprto', token)
  if (token) {
    console.log('inside token', token);
    axios.interceptors.request.use(
      config => {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
        
console.log(axios.interceptors.request);
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
  }
  else{
    //  console.log(config.headers.Authorization)
     console.log('inside token else', token);
    axios.interceptors.request.use(
      config => {
        config.headers.Authorization = 'Bearer ' + "token"
         console.log(config.headers.Authorization, " in else")
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
  }
}
export default interceptors
