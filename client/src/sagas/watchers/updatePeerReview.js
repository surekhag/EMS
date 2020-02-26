import { takeLatest, call, put } from 'redux-saga/effects'
import { UPDATE_PEER_REVIEW } from '../../actions/actionTypes.js'
import { updatePeerReview } from '../../api/peerReviewApi'
import { SetUpdateReviewStatus } from '../../actions/peerReviewAction'

function* workerUpdatePeerReviewSaga(data) {
  try {
    const status = yield call(
      updatePeerReview,
      data.payload.id,
      data.payload.body
    )

    yield put(SetUpdateReviewStatus(status))
  } catch (e) {
    console.log(e)
  }
}

export default function* watchUpdatePeerReviewSaga() {
  yield takeLatest(UPDATE_PEER_REVIEW, workerUpdatePeerReviewSaga)
}
