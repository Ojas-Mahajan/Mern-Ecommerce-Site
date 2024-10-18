/**
 *
 * app.js
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import { SocketProvider } from './contexts/Socket';
import { SET_AUTH } from './containers/Authentication/constants';
import Application from './containers/Application';
import ScrollToTop from './scrollToTop';
import setToken from './utils/token';

// Import application sass styles
import './styles/style.scss';

// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';

// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

// React-Bootstrap Table styles
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// rc-slider style
import 'rc-slider/assets/index.css';

// Authentication
const token = localStorage.getItem('token');

if (token) {
  // Authenticate API authorization
  setToken(token);

  // Dispatch authentication action
  store.dispatch({ type: SET_AUTH });
}

// Main App Component
const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SocketProvider>
        <ScrollToTop>
          <Application />
        </ScrollToTop>
      </SocketProvider>
    </ConnectedRouter>
  </Provider>
);

export default App;
