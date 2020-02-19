import { SET_ALL_PEER } from '../actions/actionTypes.js'

const initialState = {
    peerReviewData: null
}
export default function peerReviewReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_PEER:
            return {
                ...state,
                peerReviewData: action.payload.data
            }
        default:
            return state
    }
}
