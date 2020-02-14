import { put, takeLatest, call } from 'redux-saga/effects'

import { LOAD_ALL_EMPLOYEE_SAGA } from '../../actions/actionTypes.js'
import { setAllEmployeeData } from '../../actions/employeeAction.js'
import { loadAllEmployeeData } from '../../api/employeeApi.js'

function* workerEmployeeInfoSaga() {
    try {
        console.log('worker')
        const employees = yield call(loadAllEmployeeData)
        console.log("emp",employees);
        yield put(setAllEmployeeData(employees))
    } catch (e) {
        // yield put(setError(INVALID_CREDENTIAL));
    }
}

export default function* watchEmployeeInfoSaga() {
    yield takeLatest(LOAD_ALL_EMPLOYEE_SAGA, workerEmployeeInfoSaga)
}
