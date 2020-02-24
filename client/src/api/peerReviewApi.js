import axios from 'axios'
import {
  FETCH_PEER_REVIEW,
  CREATE_PEER_REVIEW
} from '../configurations/endPoints'

export function loadAllPeerReviews() {
  return axios.get(FETCH_PEER_REVIEW)
}
export function createPeerReview(body) {
  return axios.post(CREATE_PEER_REVIEW, body, {
    headers: { 'Content-Type': 'application/json' }
  })
}
