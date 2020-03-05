import { put, takeLatest, call } from 'redux-saga/effects'

import { LOAD_ALL_EMPLOYEE_SAGA, DELETE_EMPLOYEE } from '../../actions/actionTypes.js'
import { setAllEmployeeData } from '../../actions/employeeAction.js'
import { loadAllEmployeeData,deleteEmployeeApi } from '../../api/employeeApi.js'

function* workerEmployeeInfoSaga() {
  try {
    const employees = yield call(loadAllEmployeeData)
    yield put(setAllEmployeeData(employees))
  } catch (e) {
    // yield put(setError(INVALID_CREDENTIAL));
  }
}

export  function* watchEmployeeInfoSaga() {
  yield takeLatest(LOAD_ALL_EMPLOYEE_SAGA, workerEmployeeInfoSaga)
}

//delete employee and fetch data again todo


function* workerDeleteEmployeeSaga({payload}) {
  const {id} = payload; 
  console.log("in saga deleteEmployeeApi", id)
  // try {
  //   const employees = yield call(deleteEmployeeApi, id)
  //   yield put(setAllEmployeeData(employees))
  // } catch (e) {
  //   // yield put(setError(INVALID_CREDENTIAL));
  // }
}


export  function* watchDeleteEmployeeSaga() {
  yield takeLatest(DELETE_EMPLOYEE, workerDeleteEmployeeSaga)
}