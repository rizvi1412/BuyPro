// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import createStore from '../store';
import {PersistGate} from 'redux-persist/integration/react';

let store;

class AppStoreProvider extends React.Component {
  static childContextTypes = {
    store: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      store,
    };
  }

  render() {
    const {children} = this.props;
    store = store || createStore();
    return (
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  }
}

export default AppStoreProvider;
