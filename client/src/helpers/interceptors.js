import axios from 'axios'

const interceptors = () => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.interceptors.request.use(
            config => {
                config.headers['Authorization'] = 'Bearer ' + token
                console.log('Config', config)
                return config
            },
            error => {
                Promise.reject(error)
            }
        )
    }
}
export default interceptors
