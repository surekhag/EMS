import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from '../src/store/index.js'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Interceptors from './helpers/interceptors.js'
import User from './layouts/User/User'
import Login from './layouts/Login/Login'
import AuthenticationHOC from './HOC/LoggedInCheck.js'

const hist = createBrowserHistory()

const Index = props => {
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            Interceptors(token)
        }
    }, [])
    const UserWithAuthentication = AuthenticationHOC(User)
    return (
        <Provider store={store}>
            <Router history={hist}>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/admin" component={UserWithAuthentication} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </Router>
        </Provider>
    )
}
ReactDOM.render(<Index />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
