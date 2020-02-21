import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ToastProvider } from 'react-toast-notifications'
import './index.css'
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from '../src/store/index.js'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import interceptors from './helpers/interceptors'
import User from './layouts/User/User'
import Login from './components/Login/Login';
import UserContexProvider from './context-provider/user-context'

const hist = createBrowserHistory()

const Index = props => {

    useEffect(() => {
        interceptors()
        //relogin to site if token is available
    }, [])

    return (
        <Provider store={store}>
            <UserContexProvider>
                <Router history={hist}>
                    <ToastProvider>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route path="/admin" component={User} />
                            <Redirect from="/" to="/login" />
                        </Switch>
                    </ToastProvider>
                </Router>
            </UserContexProvider>
        </Provider>
    )
}
ReactDOM.render(<Index />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
