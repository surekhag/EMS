import {
  SET_ALL_PEER,
  SET_PEER_SUCCESS_MESSAGE,
  SET_ALL_USER_PEER,
  SET_PEER_REVIEW_UPDATE_STATUS
} from '../actions/actionTypes.js'

const initialState = {
  peerReviewData: null,
  peerReviewMessage: null,
  peerReviewUpdateStatus: null,
  userPeerReview: null
}
export default function peerReviewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PEER:
      return {
        ...state,
        peerReviewData: action.payload.data
      }
    case SET_PEER_SUCCESS_MESSAGE:
      return {
        ...state,
        peerReviewMessage: action.payload.messageStatus
      }
    case SET_ALL_USER_PEER:
      return {
        ...state,
        userPeerReview: action.payload.data
      }
    case SET_PEER_REVIEW_UPDATE_STATUS:
      return {
        ...state,
        peerReviewUpdateStatus: action.payload.data
      }
    default:
      return state
  }
}
