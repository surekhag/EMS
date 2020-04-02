import { takeLatest, call, put } from 'redux-saga/effects'
import {
  ALLOCATE_PROJECT,
  GET_PROJECT_ALLOCATION_DATA
} from '../../actions/actionTypes'
import {
  setAllocateProjectSuccess,
  setAllocateProjectError,
  setProjectAllocationData,
  setProjectAllocationDataErr
} from '../../actions/projectAction'
import {
  allocateProjectApi,
  projectAllocationDataApi
} from '../../api/projectsApi'

function* workerAllocateProjectSaga(projectInfo) {
  try {
    const allocateProjectResponse = yield call(allocateProjectApi, projectInfo)
    yield put(setAllocateProjectSuccess(allocateProjectResponse.data.message))
    // yield put(loadAllProjects())
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      // To do add code for all api calls .. invalid token case falls here
      yield put(setAllocateProjectError(e.response.data.message))
    } else {
      yield put(setAllocateProjectError(e))
    }
  }
}
export function* watchAllocateProjectSaga() {
  yield takeLatest(ALLOCATE_PROJECT, workerAllocateProjectSaga)
}

function* workerProjectAllocationDataSaga({ payload }) {
  const { id } = payload
  try {
    const projectAllocationData = yield call(projectAllocationDataApi, id)

    console.log('saga', projectAllocationData.data.data)
    yield put(setProjectAllocationData(projectAllocationData.data.data))
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      // To do add code for all api calls .. invalid token case falls here
      yield put(setProjectAllocationDataErr(e.response.data.message))
    } else {
      yield put(setProjectAllocationDataErr(e))
    }
  }
}
export function* watchProjectAllocationDataSaga() {
  yield takeLatest(GET_PROJECT_ALLOCATION_DATA, workerProjectAllocationDataSaga)
}
