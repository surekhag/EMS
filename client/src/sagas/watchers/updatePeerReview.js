import { takeLatest, call, put } from 'redux-saga/effects'
import {
  UPDATE_PEER_REVIEW,
  DELETE_PEER_REVIEW
} from '../../actions/actionTypes.js'
import { updatePeerReview, deletePeerReview } from '../../api/peerReviewApi'
import {
  setUpdateReviewStatus,
  setUpdateReviewError,
  peerReviewDeleteSuccess,
  peerReviewDeleteFailue
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
}

export function* watchUpdatePeerReviewSaga() {
  yield takeLatest(UPDATE_PEER_REVIEW, workerUpdatePeerReviewSaga)
}
function* workerDaletePeerReviewSaga(data) {
  try {
    console.log(data, 'datain SAga')
    const status = yield call(deletePeerReview, data.payload.id)
    console.log(status, 'status')
    yield put(peerReviewDeleteSuccess(status))
  } catch (e) {
    yield put(peerReviewDeleteFailue(e))
  }
}

export function* watchDeletePeerReviewSaga() {
  yield takeLatest(DELETE_PEER_REVIEW, workerDaletePeerReviewSaga)
}
