//todo - rename this file
const STATES_URL = 'http://www.mocky.io/v2/5e314a773200002d008883d8'
const EMPLOYEE_URL = 'http://localhost:3001/users/'
const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
const LOGIN_URL = `http://localhost:3001/users/login`
export { STATES_URL, EMPLOYEE_URL, LOGIN_URL, headers }
