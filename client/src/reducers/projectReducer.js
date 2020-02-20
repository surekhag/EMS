import { SET_ALL_PROJECTS } from '../actions/actionTypes.js'

const initialState = {
    projects: null
}
export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_PROJECTS:
            return {
                ...state,
                projects: action.payload.data
            }
        default:
            return state
    }
}
