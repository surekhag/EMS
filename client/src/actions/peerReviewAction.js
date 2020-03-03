import {
  LOAD_ALL_PEER_SAGA,
  SET_ALL_PEER,
  CREATE_PEER_SAGA,
  SET_PEER_SUCCESS_MESSAGE,
  LOAD_ALL_USER_PEER_SAGA,
  SET_ALL_USER_PEER,
  UPDATE_PEER_REVIEW,
  SET_PEER_REVIEW_UPDATE_STATUS,
  SET_PEER_REVIEW_UPDATE_ERROR,
  SET_ALL_PEER_ERROR,
  SET_ALL_USER_PEER_ERROR,
  SET_PEER_ERROR
} from './actionTypes'

export function loadAllPeerReviews() {
  return {
    type: LOAD_ALL_PEER_SAGA,
    payload: {}
  }
}
export function setAllPeerReviews(data) {
  return {
    type: SET_ALL_PEER,
    payload: { data }
  }
}

export function setAllPeerReviewsError(data) {
  return {
    type: SET_ALL_PEER_ERROR,
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

export function setPeerReviewError(data) {
  return {
    type: SET_PEER_ERROR,
    payload: { data }
  }
}


export function LoadAllPeerForUser() {
  return {
    type: LOAD_ALL_USER_PEER_SAGA,
    payload: {}
  }
}
export function setAllPeerForUser(data) {
  return {
    type: SET_ALL_USER_PEER,
    payload: { data }
  }
}

export function setAllPeerForUserError(data) {
  return {
    type: SET_ALL_USER_PEER_ERROR,
    payload: { data }
  }
}


export function UpdatePeerReview(id, body) {
  return {
    type: UPDATE_PEER_REVIEW,
    payload: { id, body }
  }
}
export function setUpdateReviewStatus(data) {
  return {
    type: SET_PEER_REVIEW_UPDATE_STATUS,
    payload: { data }
  }
}


export function setUpdateReviewError(data) {
  return {
    type: SET_PEER_REVIEW_UPDATE_ERROR,
    payload: { data }
  }
}
