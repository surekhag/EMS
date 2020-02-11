import { takeLatest, call } from 'redux-saga/effects'
import { LOGOUT_FROM_SITE } from '../../actions/actionTypes.js'
import clearStorage from '../../helpers/clearStorage.js'

function* workerLogoutSaga() {
    yield call(clearStorage)
}

export default function* watchLogoutSaga() {
    yield takeLatest(LOGOUT_FROM_SITE, workerLogoutSaga)
}
