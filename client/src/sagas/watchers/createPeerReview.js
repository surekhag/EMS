import { takeLatest, call, put } from 'redux-saga/effects'
import { CREATE_PEER_SAGA } from '../../actions/actionTypes.js'
import { createPeerReview } from '../../api/peerReviewApi'
import { setPeerReviewSuccess, setPeerReviewError } from '../../actions/peerReviewAction'

function* workerCreatePeerReviewSaga(body) {
  try {
    const message = yield call(createPeerReview, body.payload.body)
    yield put(setPeerReviewSuccess(message))
  } catch (e) {
    yield put(setPeerReviewSuccess(e))
    // yield put(setPeerReviewError(e)) //todo

  }
}

export default function* watchCreatePeerReviewSaga() {
  yield takeLatest(CREATE_PEER_SAGA, workerCreatePeerReviewSaga)
}
