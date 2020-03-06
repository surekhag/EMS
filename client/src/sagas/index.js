import { all, fork } from 'redux-saga/effects'
import watchLogoutSaga from './watchers/logout.js'
import {watchEmployeeInfoSaga, watchDeleteEmployeeSaga} from './watchers/employeeInfo.js'
import watchLoginSaga, { watchAuthenticateSaga } from './watchers/login'

import watchPeerReviewSaga from './watchers/peerReview'
import watchLoadAllProjects from './watchers/project'
import watchCreatePeerReviewSaga from './watchers/createPeerReview'
import watchLoadUserPeerReviewSaga from './watchers/peerReviewsForUser'
import watchUpdatePeerReviewSaga from './watchers/updatePeerReview'
import {watchUserSaga, watchUpadateUserSaga} from './watchers/user'

export default function* root() {
  yield all([
    fork(watchLogoutSaga),
    fork(watchEmployeeInfoSaga),
    fork(watchLoginSaga),
    fork(watchPeerReviewSaga),
    fork(watchAuthenticateSaga),
    fork(watchLoadAllProjects),
    fork(watchCreatePeerReviewSaga),
    fork(watchLoadUserPeerReviewSaga),
    fork(watchUpdatePeerReviewSaga),
    fork(watchUserSaga),
    fork(watchDeleteEmployeeSaga),
    fork(watchUpadateUserSaga),
  ])
}
