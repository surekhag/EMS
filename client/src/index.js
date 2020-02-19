import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ToastProvider } from 'react-toast-notifications'
import './index.css'
import axios from 'axios'
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from '../src/store/index.js'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import interceptors from './helpers/interceptors'
import User from './layouts/User/User'
import Login from './components/Login/Login';
import {AUTH_URL} from './configurations/config';
import UserContexProvider from './context-provider/user-context'
import { Link } from 'react-router-dom'

const hist = createBrowserHistory()

const Index = props => {
    const [redirectToPath, setPath] = useState(null);

    useEffect(() => {
        interceptors()
        //relogin to site if token is available
    }, [])

    useEffect(() => {
            axios.get(AUTH_URL)
            .then(
                res =>{                    
                  if(window.location.pathname =='/login')
                    setPath("/admin/dashboard");
             },
         (error) => {
            // console.log( error.response);        
            if(error.response.status ==401 && error.response.data.message == "Invalid Token"){
                    console.log("In error", window.location.pathname);
                    localStorage.clear();
                    if(window.location.pathname != '/login'){                   
                        // setPath("/login");                        
                        window.location.href = '/login';
                    }                   
            }
        }
    )
    }, [])

    return (
        <Provider store={store}>
            <UserContexProvider>
                <Router history={hist}>              
                    <ToastProvider>
                        <Switch>                        
                            <Route exact path="/login" component={Login} >

                                </Route>
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
