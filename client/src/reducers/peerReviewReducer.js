import {
  SET_ALL_PEER,
  SET_PEER_SUCCESS_MESSAGE
} from '../actions/actionTypes.js'

const initialState = {
  peerReviewData: null,
  peerReviewMessage: null
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
    default:
      return state
  }
}
