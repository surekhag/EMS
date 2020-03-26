import { put, takeLatest, call } from 'redux-saga/effects'

import {
  LOAD_ALL_EMPLOYEE_SAGA,
  LOAD_ALL_MANAGER_SAGA,
  LOAD_ACTIVE_EMPLOYEES,
  DELETE_EMPLOYEE
} from '../../actions/actionTypes'
import {
  setAllEmployeeData,
  deleteEmployeeSuccess,
  deleteEmployeeError,
  setManagers,
  setManagerError,
  setActiveEmployeeData,
loadActiveEmployeeError
} from '../../actions/employeeAction'
import {
  loadAllEmployeeData,
  loadManagers,
  deleteEmployeeApi,
  loadActiveEmployeeApi
} from '../../api/employeeApi'

function* workerEmployeeInfoSaga({payload}) {
  console.log('saga',payload)
  const {data} = payload;
  try {
    if(data){
const employees = yield call(loadActiveEmployeeApi,data)
    yield put(setActiveEmployeeData(employees))
    }
    else{
    const employees = yield call(loadAllEmployeeData)
    yield put(setAllEmployeeData(employees))
    }
    
  } catch (e) { }
}

export function* watchEmployeeInfoSaga() {
  yield takeLatest(LOAD_ALL_EMPLOYEE_SAGA, workerEmployeeInfoSaga)
}

function* workerActiveEmployeeInfoSaga() {
  try {
    const employees = yield call(loadActiveEmployeeApi)
    yield put(setActiveEmployeeData(employees))
  } catch (e) {
if (e.response.data && e.response.data.message) {
      yield put(loadActiveEmployeeError(e.response.data.message))
    } else {
      yield put(loadActiveEmployeeError(e))
    }

   }
}

export function* watchActiveEmployeeInfoSaga() {
  yield takeLatest(LOAD_ACTIVE_EMPLOYEES, workerActiveEmployeeInfoSaga)
}

//load Manager Saga
function* workerManagerSaga() {
  try {
    const managers = yield call(loadManagers)
    yield put(setManagers(managers.data.data))
  } catch (e) {
    setManagerError(e);
  }
}

export function* watchManagerSaga() {
  yield takeLatest(LOAD_ALL_MANAGER_SAGA, workerManagerSaga)
}

// Delete employee and fetch data again
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
