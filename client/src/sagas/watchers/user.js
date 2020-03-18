import { put, takeLatest, call } from 'redux-saga/effects'
import { ADD_NEW_USER, UPDATE_USER } from '../../actions/actionTypes.js'
import {
  setNewUserSuccess,
  setNewUserError,
  setUpdateUserSuccess,
  setUpdateUserError
} from '../../actions/userActions'
import { loadAllEmployeeData } from '../../actions/employeeAction'
import { addNewUserApi, updateUserApi } from '../../api/userApi'

function * workerUserSaga (userinfo) {
  try {
    const addUserResponse = yield call(addNewUserApi, userinfo)
    yield put(setNewUserSuccess(addUserResponse.data.message))
    yield put(loadAllEmployeeData())
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      if (e.response.data.message.indexOf('duplicate') !== -1) {
        yield put(setNewUserError(null))
        yield put(setNewUserError('User Already Exist!'))
      } else {
        // To do add code for all api calls .. invalid token case falls here
        yield put(setNewUserError(e.response.data.message))
      }
    } else {
      yield put(setNewUserError(e))
    }
  }
}

export function * watchUserSaga () {
  yield takeLatest(ADD_NEW_USER, workerUserSaga)
}

function * workerUpadateUserSaga ({ payload }) {
  try {
    const updateUserResponse = yield call(updateUserApi, payload)
    yield put(setUpdateUserSuccess(updateUserResponse.data.message))
    yield put(loadAllEmployeeData())
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      //To do add code for all api calls .. invalid token case falls here
      yield put(setUpdateUserError(e.response.data.message))
    } else {
      yield put(setUpdateUserError(e))
    }
  }
}

export function * watchUpadateUserSaga () {
  yield takeLatest(UPDATE_USER, workerUpadateUserSaga)
}
