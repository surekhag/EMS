import { takeLatest, call, put } from 'redux-saga/effects'
import { FETCH_ALL_PROJECTS_SAGA, DELETE_PROJECT } from '../../actions/actionTypes.js'
import { loadAllProjects, deleteProjectApi } from '../../api/projectsApi'
import { setAllProjectsData, deleteProjectSuccess, deleteProjectError } from '../../actions/projectAction'

function* workerLoadAllProjects() {
  try {
    const projects = yield call(loadAllProjects)
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
function* workerDeleteProjectSaga({payload}) {
  const {id} = payload;   
  try {
    const project = yield call(deleteProjectApi, id)    
    yield put(deleteProjectSuccess(project.data.message));
    const projects = yield call(loadAllProjects)
    yield put(setAllProjectsData(projects))
  } catch (e) {
    if(e.response.data && e.response.data.message){
      yield put(deleteProjectError(e.response.data.message))
    }
    else{
      yield put(deleteProjectError(e))
    }
  }
}

export  function* watchDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT, workerDeleteProjectSaga)
}