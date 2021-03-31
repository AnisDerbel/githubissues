import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './appReducer';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware];
if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createFlipperMiddleware = require('rn-redux-middleware-flipper').default;
  middleWares.push(createFlipperMiddleware());
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));
sagaMiddleware.run(rootSaga);

export default store;
