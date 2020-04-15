import axios from 'axios'
import {
  FETCH_PEER_REVIEW,
  CREATE_PEER_REVIEW,
  FETCH_PEER_REVIEW_FOR_MANAGER
} from '../configurations/endPoints'

export function loadAllPeerReviews(status) {
  return axios.get(FETCH_PEER_REVIEW, { params: status })
}
export function loadAllUserPeerReviews(id) {
  return axios.get(FETCH_PEER_REVIEW + id)
}
export function loadAllPeerReviewsForManager(body) {
  return axios.get(FETCH_PEER_REVIEW_FOR_MANAGER, { params: body })
}
export function createPeerReview(body) {
  return axios.post(CREATE_PEER_REVIEW, body)
}
export function updatePeerReview(id, body) {
  return axios.put(FETCH_PEER_REVIEW + id, body)
}
export function deletePeerReview(id) {
  return axios.delete(FETCH_PEER_REVIEW + id)
}
