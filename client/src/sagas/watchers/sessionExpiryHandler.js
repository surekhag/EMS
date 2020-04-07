import { sessionExpired } from '../../actions/loginAction'
import { removeToken } from '../../helpers/auth'
import { put } from 'redux-saga/effects'

export function* sessionExpiryHandler() {
  removeToken()
  yield put(sessionExpired())
}
