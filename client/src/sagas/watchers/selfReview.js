import { takeLatest, call, put } from 'redux-saga/effects'
import {
  LOAD_ALL_USER_SELF_REVIEWS,
  UPDATE_SELF_REVIEW
} from '../../actions/actionTypes'
import {
  loadAllUserSelfReviews,
  updateSelfReview
} from '../../api/selfReviewApi'
import {
  setAllSelfReviewsForUser,
  setAllSelfReviewsForUserError,
  setUpdateReviewError,
  setUpdateReviewStatus
} from '../../actions/selfReviewActions'
import { sessionExpiryHandler } from './sessionExpiryHandler'

function* workerLoadAllUserSelfReviewSaga({ payload }) {
  const { id } = payload
  try {
    const selfReviews = yield call(loadAllUserSelfReviews, id)
    yield put(setAllSelfReviewsForUser(selfReviews.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setAllSelfReviewsForUserError(e.response.data.message))
    } else {
      yield put(setAllSelfReviewsForUserError(e))
    }
  }
}

export function* watchUserSelfReviewSaga() {
  yield takeLatest(LOAD_ALL_USER_SELF_REVIEWS, workerLoadAllUserSelfReviewSaga)
}

function* workerUpdateUserSelfReviewSaga({ payload }) {
  const { id, body } = payload
  try {
    const selfReviews = yield call(updateSelfReview, id, body)
    if (selfReviews.data.status == 'error') {
      yield put(setUpdateReviewError(selfReviews.data.message))
    }
    if (selfReviews.data.status == 'success') {
      yield put(setUpdateReviewStatus(selfReviews.data.message))
    }
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message === 'Invalid Token') {
        yield sessionExpiryHandler()
      } else yield put(setAllSelfReviewsForUserError(e.response.data.message))
    } else {
      yield put(setAllSelfReviewsForUserError(e))
    }
  }
}

export function* watchUpdateUserSelfReviewSaga() {
  yield takeLatest(UPDATE_SELF_REVIEW, workerUpdateUserSelfReviewSaga)
}
