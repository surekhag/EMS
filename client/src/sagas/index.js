import { all, fork } from 'redux-saga/effects';

import watchStatesInfoSaga from './watchers/StatesInfo.js';
import watchEmployeeInfoSaga from './watchers/EmployeeInfo.js';
import watchLoginSaga from './watchers/login';

export default function* root() {
    yield all([
      fork(watchStatesInfoSaga),
      fork(watchEmployeeInfoSaga),
      fork(watchLoginSaga),
    ]);
  }
  
