import { all, fork } from 'redux-saga/effects'
import watchLogoutSaga from './watchers/logout.js'
import watchEmployeeInfoSaga from './watchers/employeeInfo.js'
import watchLoginSaga from './watchers/login'

export default function* root() {
    yield all([
        fork(watchLogoutSaga),
        fork(watchEmployeeInfoSaga),
        fork(watchLoginSaga)
    ])
}
