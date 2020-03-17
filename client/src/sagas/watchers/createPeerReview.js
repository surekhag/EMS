import { takeLatest, call, put } from 'redux-saga/effects'
import { CREATE_PEER_SAGA } from '../../actions/actionTypes.js'
import { createPeerReview } from '../../api/peerReviewApi'
import {
  setPeerReviewSuccess
} from '../../actions/peerReviewAction'

function * workerCreatePeerReviewSaga({ payload }) {
  const { body } = payload
  try {
    const message = yield call(createPeerReview, body)
    yield put(setPeerReviewSuccess(message))
  } catch (e) {
    yield put(setPeerReviewSuccess(e))
  }
}

export default function * watchCreatePeerReviewSaga() {
  yield takeLatest(CREATE_PEER_SAGA, workerCreatePeerReviewSaga)
}
