import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
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

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const routes =
<BrowserRouter>
  <div>
    <Route exact path="/" component={App} />
    <Route exact path="/home" component={Home} />
  </div>
</BrowserRouter>

ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('root'));
registerServiceWorker();
