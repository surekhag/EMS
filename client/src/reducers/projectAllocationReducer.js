import {
  SET_ALLOCATE_PROJECT_SUCCESS,
  SET_ALLOCATE_PROJECT_ERROR,
  CLEAR_PROJECT_ALLOCATION_MESSAGE,
  SET_PROJECT_ALLOCATION_DATA,
  PROJECT_ALLOCATION_DATA_ERROR
} from '../actions/actionTypes'

const initialState = {
  projectAllocationStatus: null,
  projectAllocationError: null,
  singleProjectAllocationData: null,
  singleProjectAllocationDataError: null
}
//to do remove unwanted code

export default function projectAllocationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT_ALLOCATION_DATA:
      return {
        ...state,
        singleProjectAllocationData: action.data
      }

    case PROJECT_ALLOCATION_DATA_ERROR:
      return {
        ...state,
        singleProjectAllocationDataError: action.data
      }
    case SET_ALLOCATE_PROJECT_SUCCESS:
      return {
        ...state,
        projectAllocationStatus: action.data
      }

    case SET_ALLOCATE_PROJECT_ERROR:
      return {
        ...state,
        projectAllocationError: action.data
      }
    // case SET_UPDATE_PROJECT_ALLOCATION_SUCCESS:
    //   return {
    //     ...state,
    //     updateProjectAllocationStatus: action.data
    //   }
    // case SET_UPDATE_PROJECT_ALLOCATION_ERROR:
    //   return {
    //     ...state,
    //     updateProjectAllocationError: action.data
    //   }
    case CLEAR_PROJECT_ALLOCATION_MESSAGE:
      return {
        ...state,
        projectAllocationError: null,
        projectAllocationStatus: null
      }

    // case DELETE_PROJECT_ALLOCATION_SUCCESS:
    //   return {
    //     ...state,
    //     deleteProjectAllocationSuccess: action.payload.data
    //   }
    // case DELETE_PROJECT_ALLOCATION_ERROR:
    //   return {
    //     ...state,
    //     deleteProjectAllocationError: action.payload.data
    //   }

    default:
      return state
  }
}
