import {
  LOAD_ALL_PEER_SAGA,
  SET_ALL_PEER,
  CREATE_PEER_SAGA,
  SET_PEER_SUCCESS_MESSAGE
} from './actionTypes'

export function LoadAllPeerReviews() {
  return {
    type: LOAD_ALL_PEER_SAGA,
    payload: {}
  }
}
export function SetAllPeerReviews(data) {
  return {
    type: SET_ALL_PEER,
    payload: { data }
  }
}
export function createPeerReview(body) {
  return {
    type: CREATE_PEER_SAGA,
    payload: { body }
  }
}
export function setPeerReviewSuccess(messageStatus) {
  return {
    type: SET_PEER_SUCCESS_MESSAGE,
    payload: { messageStatus }
  }
}
