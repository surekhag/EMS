import { put, takeLatest, call } from 'redux-saga/effects'

import {
  LOAD_ALL_EMPLOYEE_SAGA,
  DELETE_EMPLOYEE
} from '../../actions/actionTypes.js'
import {
  setAllEmployeeData,
  deleteEmployeeSuccess,
  deleteEmployeeError
} from '../../actions/employeeAction.js'
import {
  loadAllEmployeeData,
  deleteEmployeeApi
} from '../../api/employeeApi.js'

function* workerEmployeeInfoSaga() {
  try {
    const employees = yield call(loadAllEmployeeData)
    yield put(setAllEmployeeData(employees))
  } catch (e) { }
}

export function* watchEmployeeInfoSaga() {
  yield takeLatest(LOAD_ALL_EMPLOYEE_SAGA, workerEmployeeInfoSaga)
}

//Delete employee and fetch data again
function* workerDeleteEmployeeSaga({ payload }) {
  const { id } = payload
  try {
    const employee = yield call(deleteEmployeeApi, id)
    yield put(deleteEmployeeSuccess(employee.data.message))
    const employees = yield call(loadAllEmployeeData)
    yield put(setAllEmployeeData(employees))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      yield put(deleteEmployeeError(e.response.data.message))
    } else {
      yield put(deleteEmployeeError(e))
    }
  }
}

export function* watchDeleteEmployeeSaga() {
  yield takeLatest(DELETE_EMPLOYEE, workerDeleteEmployeeSaga)
}
