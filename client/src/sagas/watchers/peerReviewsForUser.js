import { takeLatest, call, put } from 'redux-saga/effects'
import { LOAD_ALL_USER_PEER_SAGA } from '../../actions/actionTypes.js'
import { loadAllUserPeerReviews } from '../../api/peerReviewApi'
import {
  setAllPeerForUser,
  setAllPeerForUserError
} from '../../actions/peerReviewAction'

function * workerLoadUserPeerReviewSaga() {
  try {
    const peerReviews = yield call(loadAllUserPeerReviews)
    yield put(setAllPeerForUser(peerReviews))
  } catch (e) {
    console.log(e)
    // yield put(setAllPeerForUserError(e)); //todo
  }
}

export default function * watchLoadUserPeerReviewSaga() {
  yield takeLatest(LOAD_ALL_USER_PEER_SAGA, workerLoadUserPeerReviewSaga)
}
