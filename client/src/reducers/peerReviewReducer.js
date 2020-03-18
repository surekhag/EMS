import {
  SET_ALL_PEER,
  SET_PEER_SUCCESS_MESSAGE,
  SET_ALL_USER_PEER,
  SET_PEER_REVIEW_UPDATE_STATUS,
  SET_PEER_REVIEW_UPDATE_ERROR,
  DELETE_PEER_REVIEW_SUCCESS,
  DELETE_PEER_REVIEW_ERROR
} from '../actions/actionTypes.js'

const initialState = {
  peerReviewData: null,
  peerReviewUpdateError: null,
  peerReviewMessage: null,
  peerReviewUpdateStatus: null,
  userPeerReview: null,
  peerReviewDeleteSuccess: null,
  peerReviewDeleteError: null
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
    case SET_PEER_REVIEW_UPDATE_ERROR:
      return {
        ...state,
        peerReviewUpdateError: action.payload.data
      }
    case DELETE_PEER_REVIEW_SUCCESS:
      return {
        ...state,
        peerReviewDeleteSuccess: action.payload.data
      }
    case DELETE_PEER_REVIEW_ERROR:
      return {
        ...state,
        peerReviewDeleteError: action.payload.data
      }
    default:
      return state
  }
}
