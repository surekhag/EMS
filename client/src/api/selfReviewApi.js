import axios from 'axios'
import {
  SELF_REVIEWS_URL,
  CREATE_SELF_REVIEW
} from '../configurations/endPoints'

export function loadAllSelfReviews() {
  return axios.get(SELF_REVIEWS_URL)
}
export function loadAllUserSelfReviews(id) {
  return axios.get(`${SELF_REVIEWS_URL}${id}`)
}
export function createSelfReview(body) {
  return axios.post(CREATE_SELF_REVIEW, body)
}
export function updateSelfReview(id, body) {
  return axios.put(`${SELF_REVIEWS_URL}${id}`, body)
}
export function deleteSelfReview(id) {
  return axios.delete(`${SELF_REVIEWS_URL}${id}`)
}
