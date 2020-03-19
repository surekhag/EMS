import {
  SET_ALL_USER_SELF_REVIEWS,
  SET_ALL_USER_SELF_REVIEWS_ERROR,
  SET_SELF_REVIEW_UPDATE_STATUS,
  SET_SELF_REVIEW_UPDATE_ERROR,
  CLEAR_REVIEW_STATUS
} from '../actions/actionTypes.js'

const initialState = {
  userSelfReviewDeatils: null,
  userSelfReviewDeatilsError: null,
  userSelfReviewUpdateStatus: null,
  userSelfReviewUpdateError: null
}
export default function selfReviewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_USER_SELF_REVIEWS:
      return {
        ...state,
        userSelfReviewDeatils: action.payload.data
      }
    case SET_ALL_USER_SELF_REVIEWS_ERROR:
      return {
        ...state,
        userSelfReviewDeatilsError: action.payload.data
      }
    case SET_SELF_REVIEW_UPDATE_STATUS:
      return {
        ...state,
        userSelfReviewUpdateStatus: action.payload.data
      }
    case SET_SELF_REVIEW_UPDATE_ERROR:
      return {
        ...state,
        userSelfReviewUpdateError: action.payload.data
      }
    case CLEAR_REVIEW_STATUS:
      return {
        ...state,
        userSelfReviewUpdateError: null,
        userSelfReviewUpdateStatus: null
      }
    default:
      return state
  }
}
