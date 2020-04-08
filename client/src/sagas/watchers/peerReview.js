import { takeLatest, call, put } from 'redux-saga/effects'
import {
  LOAD_ALL_PEER_SAGA,
  CREATE_PEER_SAGA,
  LOAD_ALL_USER_PEER_SAGA,
  UPDATE_PEER_REVIEW,
  DELETE_PEER_REVIEW
} from '../../actions/actionTypes'
import {
  loadAllPeerReviews,
  createPeerReview,
  loadAllUserPeerReviews,
  updatePeerReview,
  deletePeerReview
} from '../../api/peerReviewApi'
import {
  setAllPeerReviews,
  setAllPeerReviewsError,
  setPeerReviewSuccess,
  setAllPeerForUser,
  setAllPeerForUserError,
  setUpdateReviewStatus,
  setUpdateReviewError,
  peerReviewDeleteSuccess,
  peerReviewDeleteFailue
} from '../../actions/peerReviewAction'
import { sessionExpiryHandler } from './sessionExpiryHandler'

// Load All Peer Reviews
function* workerLoadAllPeerReviewSaga() {
  try {
    const peerReviews = yield call(loadAllPeerReviews)
    yield put(setAllPeerReviews(peerReviews))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setAllPeerReviewsError(e.response.data.message))
    } else yield put(setAllPeerReviewsError(e))
  }
}

export function* watchPeerReviewSaga() {
  yield takeLatest(LOAD_ALL_PEER_SAGA, workerLoadAllPeerReviewSaga)
}

// Create Peer Review
function* workerCreatePeerReviewSaga({ payload }) {
  const { body } = payload
  try {
    const message = yield call(createPeerReview, body)
    yield put(setPeerReviewSuccess(message))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setPeerReviewSuccess(e.response.data.message))
    } else yield put(setPeerReviewSuccess(e))
  }
  const reviews = yield call(loadAllPeerReviews)
  yield put(setAllPeerReviews(reviews))
}

export function* watchCreatePeerReviewSaga() {
  yield takeLatest(CREATE_PEER_SAGA, workerCreatePeerReviewSaga)
}

// Load Peer Reviews for User

function* workerLoadUserPeerReviewSaga({ payload }) {
  const id = payload.data
  try {
    const peerReviews = yield call(loadAllUserPeerReviews, id)
    yield put(setAllPeerForUser(peerReviews.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setAllPeerForUserError(e.response.data.message))
    } else yield put(setAllPeerForUserError(e))
  }
}

export function* watchLoadUserPeerReviewSaga() {
  yield takeLatest(LOAD_ALL_USER_PEER_SAGA, workerLoadUserPeerReviewSaga)
}

// Update Peer Review

function* workerUpdatePeerReviewSaga(data) {
  try {
    const status = yield call(
      updatePeerReview,
      data.payload.id,
      data.payload.body
    )
    yield put(setUpdateReviewStatus(status))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setUpdateReviewError(e.response.data.message))
    } else yield put(setUpdateReviewError(e))
  }

  const reviews = yield call(loadAllPeerReviews)
  yield put(setAllPeerReviews(reviews))
}

export function* watchUpdatePeerReviewSaga() {
  yield takeLatest(UPDATE_PEER_REVIEW, workerUpdatePeerReviewSaga)
}

// Delete Peer Review
function* workerDaletePeerReviewSaga(data) {
  try {
    const status = yield call(deletePeerReview, data.payload.id)
    yield put(peerReviewDeleteSuccess(status))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(peerReviewDeleteFailue(e.response.data.message))
    } else yield put(peerReviewDeleteFailue(e))
  }
  const reviews = yield call(loadAllPeerReviews)
  yield put(setAllPeerReviews(reviews))
}

export function* watchDeletePeerReviewSaga() {
  yield takeLatest(DELETE_PEER_REVIEW, workerDaletePeerReviewSaga)
}
