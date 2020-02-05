import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserHistory } from "history";
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from '../src/store/index.js'
import { Router, Route, Switch, Redirect } from "react-router-dom";
import User from "./layouts/User"
import Login from './views/Login/Login';

const hist = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
      <Router history={hist}>
        <Switch>
          {/* <Route exact path="/login" component={Login} /> */}
          <Route path="/admin" component={User} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
