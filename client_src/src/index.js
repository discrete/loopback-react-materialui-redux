import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider, FormattedMessage} from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { CookiesProvider } from 'react-cookie';
import { initialize } from 'react-localize-redux';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';

let middleware;
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middleware = applyMiddleware(promise(), thunk, logger);
} else {
  middleware = applyMiddleware(promise(), thunk);
}

if (process.env.NODE_ENV !== 'production') {
    // configure redux-devtools-extension
    // @see https://github.com/zalmoxisus/redux-devtools-extension
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    middleware = compose(middleware, devToolsExtension());
  }
}

const store = createStore(reducer, {}, middleware);

const languages = [
  { name: 'Korean', code: 'ko' },
  { name: 'English', code: 'en' },
  { name: 'Japanese', code: 'jp' },
  { name: 'Chinese', code: 'zh' },
  { name: 'French', code: 'fr' },
  { name: 'Spanish', code: 'es' }
];
store.dispatch(initialize(languages, {defaultLanguage: 'ko'}));

const requireAuth = (nextState, replace) => {
  const state = store.getState();
  const { auth } = state.auth;
  if (auth.id) {

  }
  replace('signin');
};

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

ReactDOM.render(<Provider store={store}>
  <IntlProvider locale={navigator.language || "ko"}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <CookiesProvider>
        <App />
        </CookiesProvider>
      </Router>
    </MuiThemeProvider>
    </IntlProvider>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
