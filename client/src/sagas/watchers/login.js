import { put, takeLatest, call } from 'redux-saga/effects'
import { LOGIN_TO_SITE, USER_ATHENTICATION } from '../../actions/actionTypes'
import {
  loginToSiteSuccess,
  loginToSiteError,
  sessionExpired
} from '../../actions/loginAction'
import { logInToSiteApi, userSessionApi } from '../../api/loginApi'
import { setToken, removeToken } from '../../helpers/auth'
function* workerLoginSaga({ payload }) {
  const { username, password } = payload.data
  try {
    const loginStatus = yield call(logInToSiteApi, username, password)

    if (loginStatus.data.status === 'error') {
      yield put(loginToSiteError(loginStatus.data.message))
    }
    if (loginStatus.data.status === 'success') {
      yield put(loginToSiteSuccess(loginStatus))
      setToken(loginStatus.data.data.token)
    }
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        removeToken()
        yield put(sessionExpired())
      } else yield put(loginToSiteError(e.response.data.message))
    } else yield put(loginToSiteError(e))
  }
}

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_TO_SITE, workerLoginSaga)
}

function* workerAuthenticateSaga() {
  try {
    const userSessionData = yield call(userSessionApi)
    yield put(loginToSiteSuccess(userSessionData))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        removeToken()
        yield put(sessionExpired())
      } else yield put(loginToSiteError(e.response.data.message))
    }
  }
}

export function* watchAuthenticateSaga() {
  yield takeLatest(USER_ATHENTICATION, workerAuthenticateSaga)
}
