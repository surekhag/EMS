import { SET_ALL_STATES } from '../actions/actionTypes.js'

const initialState = {
    StateSelectData: null
}
export default function setBrowserInfo(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_STATES:
            return {
                ...state,
                StateSelectData: action.payload.data
            }
        default:
            return state
    }
}
