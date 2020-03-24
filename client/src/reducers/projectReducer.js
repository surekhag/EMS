import {
  SET_ALL_PROJECTS,
  SET_NEW_PROJECT_SUCCESS,
  SET_NEW_PROJECT_ERROR,
  SET_UPDATE_PROJECT_SUCCESS,
  SET_UPDATE_PROJECT_ERROR,
  CLEAR_PROJECT_STATUS_MESSAGE,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR
} from '../actions/actionTypes'

const initialState = {
  projects: null,
  addNewProjectStatus: null,
  error: null,
  updateProjectStatus: null,
  updateProjectError: null,
  deleteProjectSuccess: null,
  deleteProjectError: null
}
export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PROJECTS:
      return {
        ...state,
        projects: action.payload.data.data.data
      }

    case SET_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        addNewProjectStatus: action.data
      }

    case SET_NEW_PROJECT_ERROR:
      return {
        ...state,
        error: action.data
      }
    case SET_UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        updateProjectStatus: action.data
      }
    case SET_UPDATE_PROJECT_ERROR:
      return {
        ...state,
        updateProjectError: action.data
      }
    case CLEAR_PROJECT_STATUS_MESSAGE:
      return {
        ...state,
        addNewProjectStatus: null,
        updateProjectStatus: null,
        error: null,
        updateProjectError: null,
        deleteProjectSuccess: null,
        deleteProjectError: null
      }
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        deleteProjectSuccess: action.payload.data
      }
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        deleteProjectError: action.payload.data
      }

    default:
      return state
  }
}
