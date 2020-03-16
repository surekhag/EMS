import { takeLatest, call } from 'redux-saga/effects'
import { LOGOUT_FROM_SITE } from '../../actions/actionTypes.js'
import { removeToken } from '../../helpers/auth'

function * workerLogoutSaga () {
  yield call(removeToken)
}

export default function * watchLogoutSaga () {
  yield takeLatest(LOGOUT_FROM_SITE, workerLogoutSaga)
}
