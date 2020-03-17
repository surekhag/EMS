import { takeLatest, call, put } from 'redux-saga/effects'
import {LOAD_ALL_USER_SELF_REVIEWS } from '../../actions/actionTypes.js'
import { loadAllUserSelfReviews } from '../../api/selfReviewApi'
import {
  setAllSelfReviewsForUser,
  setAllSelfReviewsForUserError
} from '../../actions/selfReviewActions'

function * workerLoadAllUserSelfReviewSaga({payload}) {
  const {id} = payload; 
  try {
    const selfReviews = yield call(loadAllUserSelfReviews, id)
    yield put(setAllSelfReviewsForUser(selfReviews.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      //To do add code for all api calls .. invalid token case falls here
      yield put (setAllSelfReviewsForUserError(e.response.data.message));
    } else {
     yield put (setAllSelfReviewsForUserError(e)); 
    }

  }
}

export function * watchUserSelfReviewSaga() {
  yield takeLatest(LOAD_ALL_USER_SELF_REVIEWS, workerLoadAllUserSelfReviewSaga)
}
