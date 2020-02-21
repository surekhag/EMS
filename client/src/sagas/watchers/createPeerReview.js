import { takeLatest, call, put } from 'redux-saga/effects'
import { CREATE_PEER_SAGA } from '../../actions/actionTypes.js'
import { createPeerReview } from '../../api/peerReviewApi'
import { setPeerReviewSuccess } from '../../actions/peerReviewAction'

function* workerCreatePeerReviewSaga(body) {
    try {
        console.log("body for api",body.payload.body)
        const message = yield call(createPeerReview,body.payload.body)
        console.log("success message",message);
        yield put(setPeerReviewSuccess(message))
    } catch (e) {
        console.log(e)
    }
}

export default function* watchCreatePeerReviewSaga() {
    yield takeLatest(CREATE_PEER_SAGA, workerCreatePeerReviewSaga)
}
