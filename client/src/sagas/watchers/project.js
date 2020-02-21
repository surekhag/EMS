import { takeLatest, call, put } from 'redux-saga/effects'
import { FETCH_ALL_PROJECTS_SAGA } from '../../actions/actionTypes.js'
import { loadAllProjects } from '../../api/projectsApi'
import { setAllProjectsData } from '../../actions/projectAction'

function* workerLoadAllProjects() {
    try {
        const projects = yield call(loadAllProjects)
        yield put(setAllProjectsData(projects))
    } catch (e) {
        console.log(e)
    }
}

export default function* watchLoadAllProjects() {
    yield takeLatest(FETCH_ALL_PROJECTS_SAGA, workerLoadAllProjects)
}
