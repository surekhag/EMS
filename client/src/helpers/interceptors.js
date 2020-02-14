import axios from 'axios'

const Interceptors =()=> {
    const token = localStorage.getItem('token');
    console.log("inter",token);
    if(token){
        axios.interceptors.request.use(
            config => {
                config.headers['Authorization'] = 'Bearer ' + token
                return config
            },
            error => {
                Promise.reject(error)
            }
        )
    }
}
export default Interceptors
