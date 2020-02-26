import { takeLatest, call, put } from 'redux-saga/effects'
import { LOAD_ALL_USER_PEER_SAGA } from '../../actions/actionTypes.js'
import { loadAllUserPeerReviews } from '../../api/peerReviewApi'
import { SetAllPeerForUser } from '../../actions/peerReviewAction'

function* workerLoadUserPeerReviewSaga() {
  try {
    const peerReviews = yield call(loadAllUserPeerReviews)
    yield put(SetAllPeerForUser(peerReviews))
  } catch (e) {
    console.log(e)
  }
}

export default function* watchLoadUserPeerReviewSaga() {
  yield takeLatest(LOAD_ALL_USER_PEER_SAGA, workerLoadUserPeerReviewSaga)
}
