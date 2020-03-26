import { all, fork } from 'redux-saga/effects'
import watchLogoutSaga from './watchers/logout.js'
import {
  watchEmployeeInfoSaga,
  watchManagerSaga,
  watchDeleteEmployeeSaga,
} from './watchers/employeeInfo.js'
import { watchLoginSaga, watchAuthenticateSaga } from './watchers/login'

import {
  watchPeerReviewSaga,
  watchCreatePeerReviewSaga,
  watchLoadUserPeerReviewSaga,
  watchUpdatePeerReviewSaga,
  watchDeletePeerReviewSaga
} from './watchers/peerReview'
import {
  watchLoadAllProjects,
  watchDeleteProjectSaga,
  watchAddProjectSaga,
  watchUpadateProjectSaga
} from './watchers/project'
import { watchUserSaga, watchUpadateUserSaga } from './watchers/user'
import {
  watchUserSelfReviewSaga,
  watchUpdateUserSelfReviewSaga
} from './watchers/selfReview'

export default function* root() {
  yield all([
    fork(watchLogoutSaga),
    fork(watchEmployeeInfoSaga),
    fork(watchManagerSaga),
    fork(watchLoginSaga),
    fork(watchPeerReviewSaga),
    fork(watchAuthenticateSaga),
    fork(watchLoadAllProjects),
    fork(watchCreatePeerReviewSaga),
    fork(watchLoadUserPeerReviewSaga),
    fork(watchUpdatePeerReviewSaga),
    fork(watchDeletePeerReviewSaga),
    fork(watchUserSaga),
    fork(watchDeleteEmployeeSaga),
    fork(watchUpadateUserSaga),
    fork(watchDeleteProjectSaga),
    fork(watchAddProjectSaga),
    fork(watchUpadateProjectSaga),
    fork(watchUserSelfReviewSaga),
    fork(watchUpdateUserSelfReviewSaga),
  ])
}
