import { put, takeLatest, call } from 'redux-saga/effects';
import { LOGIN_TO_SITE, USER_ATHENTICATION } from '../../actions/actionTypes.js'
import { loginToSiteSuccess,loginToSiteError } from '../../actions/loginAction'
import { logInToSiteApi, userSessionApi} from '../../api/loginApi'
import {getToken, setToken, removeToken} from '../../helpers/auth';
function* workerLoginSaga(userinfo) {    
    const { username, password } = userinfo.payload
    try {
        //todo - send object instead separate param
        const loginStatus = yield call(logInToSiteApi, username, password);  
        
        if(loginStatus.data.status == 'error'){
            yield put(loginToSiteError(loginStatus.data.message));
        }
        if(loginStatus.data.status == 'success'){
            console.log(loginStatus);
            yield put(loginToSiteSuccess(loginStatus));
            // if(loginStatus.data.data && loginStatus.data.data.token)
                setToken(loginStatus.data.data.token); 
        }        
    } catch (e) {
        yield put(loginToSiteError(e));
    }
}

export default function* watchLoginSaga() {
    yield takeLatest(LOGIN_TO_SITE, workerLoginSaga)
}

function* workerAuthenticateSaga() {   
    try {        
        const userSessionData = yield call(userSessionApi);  
        yield put(loginToSiteSuccess(userSessionData));        
    } catch (e) {     
        console.log("workerAuthenticateSaga", e);
        if(e.response.data && e.response.data.message){
            yield put(loginToSiteError(e.response.data.message));
            if(e.response.data.message == 'Invalid Token'){  
                console.log("remove token")              
                removeToken();                
            }
        }        
    }
}


export function* watchAuthenticateSaga(){
    yield takeLatest(USER_ATHENTICATION, workerAuthenticateSaga);
}