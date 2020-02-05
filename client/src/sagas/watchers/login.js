import { put, takeLatest, call } from 'redux-saga/effects';

import { LOGIN_TO_SITE,
    LOGIN_TO_SITE_SUCCESS,
    LOGIN_TO_SITE_ERROR } from '../../constants';
import { loginToSiteSuccess } from '../../actions/loginAction';
import { logInToSiteApi } from '../../api/loginApi';

function* workerLoginSaga(userinfo) {
    
    const username = userinfo.payload.username;
    const password = userinfo.payload.password;
  try{
    const loginStatus = yield call(logInToSiteApi, username, password);
    console.log('loginStatus');
    yield put(loginToSiteSuccess(loginStatus));
  }
  catch(e){
    // yield put(LOGIN_TO_SITE_ERROR(INVALID_CREDENTIAL));
  }
}

export default function* watchLoginSaga() {
  yield takeLatest( LOGIN_TO_SITE, workerLoginSaga);
}