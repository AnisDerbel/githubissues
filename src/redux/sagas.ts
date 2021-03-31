import { all, call, fork } from 'redux-saga/effects';
import repo from './repo/saga';
const sagas = [repo];

function* wrapForErrorHandling(fn: (...args: any[]) => void) {
  try {
    yield call(fn, { restarted: false });
  } catch (e) {
    console.log('app crashed: ', e);
  }
}

function* rootSaga() {
  yield all(sagas.map((saga) => fork(wrapForErrorHandling, saga)));
}

export default rootSaga;
