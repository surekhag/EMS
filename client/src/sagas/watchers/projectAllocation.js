import { takeLatest, call, put } from 'redux-saga/effects'
import { ALLOCATE_PROJECT } from '../../actions/actionTypes'
import {
  setAllocateProjectSuccess,
  setAllocateProjectError
} from '../../actions/projectAction'
import { allocateProjectApi } from '../../api/projectsApi'

export function* watchAllocateProjectSaga() {
  yield takeLatest(ALLOCATE_PROJECT, workerAllocateProjectSaga)
}
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
