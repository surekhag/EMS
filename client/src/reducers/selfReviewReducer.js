import {
  SET_ALL_USER_SELF_REVIEWS,
  SET_ALL_USER_SELF_REVIEWS_ERROR,
  SET_ALL_SELF_REVIEWS,
  SET_ALL_SELF_REVIEWS_ERROR
} from '../actions/actionTypes.js'

const initialState = {
  userSelfReviewDeatils: null,
  userSelfReviewDeatilsError: null,
  selfReviewDetails: null,
  selfReviewDetailsError: null
}
export default function peerReviewReducer(state = initialState, action) {
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
    case SET_ALL_SELF_REVIEWS:
      return {
        ...state,
        selfReviewDetails: action.payload.data
      }
    case SET_ALL_SELF_REVIEWS_ERROR:
      return {
        ...state,
        selfReviewDetailsError: action.payload.data
      }

    default:
      return state
  }
}
