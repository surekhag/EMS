import axios from 'axios'

const interceptors = () => {
  if (localStorage.getItem('token')) {
    axios.interceptors.request.use(
      config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
  }
}
export default interceptors
