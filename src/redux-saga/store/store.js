//  @flow

import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import sagas from './sagas';

export default function initializeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(sagas).toPromise();
  const persistor = persistStore(store, null, () => {
    store.getState();
  });

  return {store, persistor};
}
