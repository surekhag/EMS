import { put, takeLatest, call } from 'redux-saga/effects'

import { LOAD_ALL_EMPLOYEE_SAGA } from '../../constants'
import { setAllEmployeeData } from '../../actions'
import { loadAllEmployeeData } from '../../api/api'

function* workerEmployeeInfoSaga() {
    try {
        const employees = yield call(loadAllEmployeeData)
        yield put(setAllEmployeeData(employees))
    } catch (e) {
        // yield put(setError(INVALID_CREDENTIAL));
    }
}

export default function* watchEmployeeInfoSaga() {
    yield takeLatest(LOAD_ALL_EMPLOYEE_SAGA, workerEmployeeInfoSaga)
}
