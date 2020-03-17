import { takeLatest, call, put } from 'redux-saga/effects'
import {
  UPDATE_PEER_REVIEW,
  DELETE_PEER_REVIEW
} from '../../actions/actionTypes.js'
import { updatePeerReview, deletePeerReview, loadAllPeerReviews } from '../../api/peerReviewApi'
import {
  setUpdateReviewStatus,
  setUpdateReviewError,
  peerReviewDeleteSuccess,
  peerReviewDeleteFailue,
  setAllPeerReviews
} from '../../actions/peerReviewAction'

function* workerUpdatePeerReviewSaga(data) {
  try {
    const status = yield call(
      updatePeerReview,
      data.payload.id,
      data.payload.body
    )
    yield put(setUpdateReviewStatus(status))
  } catch (e) {
    yield put(setUpdateReviewError(e))
  }
  const reviews = yield call(loadAllPeerReviews)
  yield put(setAllPeerReviews(reviews))
}

export function* watchUpdatePeerReviewSaga() {
  yield takeLatest(UPDATE_PEER_REVIEW, workerUpdatePeerReviewSaga)
}
function* workerDaletePeerReviewSaga(data) {
  try {

    const status = yield call(deletePeerReview, data.payload.id)
    yield put(peerReviewDeleteSuccess(status))

  } catch (e) {
    yield put(peerReviewDeleteFailue(e))
  }
  const reviews = yield call(loadAllPeerReviews)
  yield put(setAllPeerReviews(reviews))
}

export function* watchDeletePeerReviewSaga() {
  yield takeLatest(DELETE_PEER_REVIEW, workerDaletePeerReviewSaga)
}
