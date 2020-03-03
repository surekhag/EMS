import { put, takeLatest, call } from 'redux-saga/effects'
import { ADD_NEW_USER, SET_NEW_USER,SET_NEW_USER_ERROR } from '../../actions/actionTypes.js'
import { setNewUserSuccess, setNewUserError } from '../../actions/userActions'
import { addNewUserApi } from '../../api/userApi'


function* workerUserSaga(userinfo) {    
  try {
    const addUserResponse =yield call(addNewUserApi, userinfo)    
    yield put(setNewUserSuccess(addUserResponse.data.message));

  } catch (e) {      
      if(e.response.data && e.response.data.message){
          if(e.response.data.message.indexOf("duplicate")!= -1){
                yield put(setNewUserError(null)); 
                yield put(setNewUserError("User Already Exist!")); 
          }
          else {
            //To do add code for all api calls .. invalid token case falls here              
            yield put(setNewUserError(e.response.data.message));
          }   
      }
      else {
        yield put(setNewUserError(e));
      }      
  }
}

export default function* watchUserSaga() {
  yield takeLatest(ADD_NEW_USER, workerUserSaga)
}
