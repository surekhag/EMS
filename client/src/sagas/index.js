import { all, fork } from 'redux-saga/effects'
import watchLogoutSaga from './watchers/logout.js'
import watchEmployeeInfoSaga from './watchers/employeeInfo.js'
import watchLoginSaga from './watchers/login';  
import {watchAuthenticateSaga} from './watchers/login';
import watchPeerReviewSaga from './watchers/peerReview'

export default function* root() {
    yield all([
        fork(watchLogoutSaga),
        fork(watchEmployeeInfoSaga),
        fork(watchLoginSaga),
        fork(watchPeerReviewSaga),
        fork(watchAuthenticateSaga),
    ])
}
