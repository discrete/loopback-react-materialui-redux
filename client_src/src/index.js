import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

ReactDOM.render(<BrowserRouter>
<div>
  <Route exact path="/" component={App} />
  <Route exact path="/home" component={Home} />
</div>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
