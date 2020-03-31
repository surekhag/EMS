import axios from 'axios'
import {
  FETCH_PEER_REVIEW,
  CREATE_PEER_REVIEW
} from '../configurations/endPoints'

export function loadAllPeerReviews() {
  return axios.get(FETCH_PEER_REVIEW)
}
export function loadAllUserPeerReviews(id) {
  return axios.get(FETCH_PEER_REVIEW + id)
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
