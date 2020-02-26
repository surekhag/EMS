import axios from 'axios'
import {
  FETCH_PEER_REVIEW,
  CREATE_PEER_REVIEW,
  FETCH_USER_PEER
} from '../configurations/endPoints'

export function loadAllPeerReviews() {
  return axios.get(FETCH_PEER_REVIEW)
}
export function loadAllUserPeerReviews() {
  return axios.get(FETCH_USER_PEER)
}
export function createPeerReview(body) {
  return axios.post(CREATE_PEER_REVIEW, body, {
    headers: { 'Content-Type': 'application/json' }
  })
}
export function updatePeerReview(id, body) {
  return axios.put(FETCH_PEER_REVIEW + id, body, {
    headers: { 'Content-Type': 'application/json' }
  })
}
