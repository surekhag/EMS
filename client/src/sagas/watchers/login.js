import { put, takeLatest, call } from 'redux-saga/effects'

import { LOGIN_TO_SITE } from '../../constants'
import { loginToSiteSuccess } from '../../actions/loginAction'
import { logInToSiteApi } from '../../api/loginApi'

function* workerLoginSaga(userinfo) {
    const username = userinfo.payload.username
    const password = userinfo.payload.password
    const userrole = userinfo.payload.userrole

    try {
        //todo - send object instead separate param
        const loginStatus = yield call(
            logInToSiteApi,
            username,
            password,
            userrole
        )
        yield put(loginToSiteSuccess(loginStatus))
    } catch (e) {
        console.log(e)
        // yield put(LOGIN_TO_SITE_ERROR(INVALID_CREDENTIAL));
    }
}

export default function* watchLoginSaga() {
    yield takeLatest(LOGIN_TO_SITE, workerLoginSaga)
}
