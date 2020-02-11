import { put, takeLatest, call } from 'redux-saga/effects'

import { LOAD_ALL_STATES_SAGA } from '../../actions/actionTypes.js'
import { setAllStatesData } from '../../actions'
import { loadAllStatesData } from '../../api/api'

function* workerStatesInfoSaga() {
    try {
        const states = yield call(loadAllStatesData)
        //localStorage.setItem('user', JSON.stringify(user.data));
        yield put(setAllStatesData(states))
    } catch (e) {
        // yield put(setError(INVALID_CREDENTIAL));
    }
}

export default function* watchStatesInfoSaga() {
    yield takeLatest(LOAD_ALL_STATES_SAGA, workerStatesInfoSaga)
}
