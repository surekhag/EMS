
import {
  SET_ALL_STATES
} from '../constants'

const initialState ={
    StateSelectData : null
}
export default function setBrowserInfo(state = initialState, action) {
    switch (action.type) {
      case SET_ALL_STATES:
        return {
          ...state,
          StateSelectData: action.payload.data,
        };
      // case CLEAR_USER:
      //   localStorage.removeItem('user');
      //   return {
      //     ...state,
      //     userData: null,
      //   };
      default:
        return state;
    }
  }