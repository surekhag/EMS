import { takeLatest, call, put } from 'redux-saga/effects'
import { LOAD_ALL_PEER_SAGA } from '../../actions/actionTypes.js'
import { loadAllPeerReviews } from '../../api/peerReviewApi'
import { SetAllPeerReviews } from '../../actions/peerReviewAction'

function* workerLoadAllPeerReviewSaga() {
  try {
    const peerReviews = yield call(loadAllPeerReviews)
    yield put(SetAllPeerReviews(peerReviews))
  } catch (e) {
    console.log(e)
  }
}

export default function* watchPeerReviewSaga() {
  yield takeLatest(LOAD_ALL_PEER_SAGA, workerLoadAllPeerReviewSaga)
}
