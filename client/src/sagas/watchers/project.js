import { takeLatest, call, put } from 'redux-saga/effects'
import {
  FETCH_ALL_PROJECTS_SAGA,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  ADD_NEW_PROJECT
} from '../../actions/actionTypes.js'
import {
  loadAllProjectsApi,
  deleteProjectApi,
  addNewProjectApi,
  updateProjectApi
} from '../../api/projectsApi'
import {
  loadAllProjects,
  setAllProjectsData,
  deleteProjectSuccess,
  deleteProjectError,
  setNewProjectSuccess,
  setNewProjectError,
  setUpdateProjectSuccess,
  setUpdateProjectError
} from '../../actions/projectAction'

function* workerLoadAllProjects() {
  try {
    const projects = yield call(loadAllProjectsApi)
    yield put(setAllProjectsData(projects))
  } catch (e) {
    console.log(e)
    // yield put(setAllProjectsDataError(e)); //todo
  }
}

export function* watchLoadAllProjects() {
  yield takeLatest(FETCH_ALL_PROJECTS_SAGA, workerLoadAllProjects)
}

//Delete Project and fetch data again
function* workerDeleteProjectSaga({ payload }) {
  const { id } = payload
  try {
    const project = yield call(deleteProjectApi, id)
    yield put(deleteProjectSuccess(project.data.message))
    yield put(loadAllProjects())
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      yield put(deleteProjectError(e.response.data.message))
    } else {
      yield put(deleteProjectError(e))
    }
  }
}

export function* watchDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT, workerDeleteProjectSaga)
}

function* workerAddProjectSaga(userinfo) {
  try {
    const addProjectResponse = yield call(addNewProjectApi, userinfo)
    yield put(setNewProjectSuccess(addProjectResponse.data.message))
    yield put(loadAllProjects())
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      // To do add code for all api calls .. invalid token case falls here
      yield put(setNewProjectError(e.response.data.message))
    } else {
      yield put(setNewProjectError(e))
    }
  }
}

export function* watchAddProjectSaga() {
  yield takeLatest(ADD_NEW_PROJECT, workerAddProjectSaga)
}

function* workerUpadateProjectSaga({ payload }) {
  try {
    const updateUserResponse = yield call(updateProjectApi, payload)
    yield put(setUpdateProjectSuccess(updateUserResponse.data.message))
    // yield put(loadAllEmployeeData())
    yield put(loadAllProjects())
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      // To do add code for all api calls .. invalid token case falls here
      yield put(setUpdateProjectError(e.response.data.message))
    } else {
      yield put(setUpdateProjectError(e))
    }
  }
}

export function* watchUpadateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT, workerUpadateProjectSaga)
}
