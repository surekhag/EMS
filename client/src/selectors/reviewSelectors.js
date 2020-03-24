export function userPeerReview(state) {
  return state.peerReviewReducer.userPeerReview
}
export function userSelfReviewDeatils(state) {
  return state.selfReviewReducer.userSelfReviewDeatils
}
export function peerReviewDataSelector(state) {
  return state.peerReviewReducer.peerReviewData
}
export function peerReviewDeleteSuccessSelector(state) {
  return state.peerReviewReducer.peerReviewDeleteSuccess
}
export function peerReviewDeleteErrorSelector(state) {
  return state.peerReviewReducer.peerReviewDeleteError
}
export function peerReviewUpdateStatusSelector(state) {
  return state.peerReviewReducer.peerReviewUpdateStatus
}
export function peerReviewMessageSelector(state) {
  return state.peerReviewReducer.peerReviewMessage
}
export function peerReviewUpdateErrorSelector(state) {
  return state.peerReviewReducer.peerReviewUpdateError
}
