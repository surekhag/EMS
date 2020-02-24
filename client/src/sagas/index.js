import { all, fork } from 'redux-saga/effects'
import watchLogoutSaga from './watchers/logout.js'
import watchEmployeeInfoSaga from './watchers/employeeInfo.js'
import watchLoginSaga, { watchAuthenticateSaga } from './watchers/login'

import watchPeerReviewSaga from './watchers/peerReview'
import watchLoadAllProjects from './watchers/project'
import watchCreatePeerReviewSaga from './watchers/createPeerReview'

export default function* root() {
  yield all([
    fork(watchLogoutSaga),
    fork(watchEmployeeInfoSaga),
    fork(watchLoginSaga),
    fork(watchPeerReviewSaga),
    fork(watchAuthenticateSaga),
    fork(watchLoadAllProjects),
    fork(watchCreatePeerReviewSaga)
  ])
}
