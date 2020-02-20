import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withToastManager, useToasts } from 'react-toast-notifications'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { loginToSite, authenticateUserSession } from '../../actions/loginAction'
import { connect } from 'react-redux'
//@material-ui/icons
// core components
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js'
import GridItem from '../Grid/GridItem.js'
import GridContainer from '../Grid/GridContainer.js'
import CustomInput from '../CustomInput/CustomInput.js'
import Button from '../CustomButtons/Button.js'
import Card from '../Card/Card.js'
import CardHeader from '../Card/CardHeader.js'
import CardBody from '../Card/CardBody.js'
import CardFooter from '../Card/CardFooter.js'
import './Login.css'
import { Redirect } from 'react-router-dom'
import {getToken} from '../../helpers/auth';
import interceptors from '../../helpers/interceptors'
import { useDispatch } from 'react-redux'

const styles = {
    ...checkboxAdnRadioStyle,
    cardCategoryWhite: {
        color: 'rgba(255,255,255,.62)',
        margin: '0',
        fontSize: '14px',
        marginTop: '0',
        marginBottom: '0'
    },
    cardTitleWhite: {
        color: '#FFFFFF',
        marginTop: '0px',
        minHeight: 'auto',
        fontWeight: '300',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: '3px',
        textDecoration: 'none'
    }
}

const useStyles = makeStyles(styles)

const Login = props => {
    const { addToast } = useToasts()
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const dispatch = useDispatch();
    
    let userInfo = useSelector(state => state.loginReducer.currentUser)
    let error = useSelector(state => state.loginReducer.error)

    const handleFormSubmit = e => {
        e.preventDefault()
        props.loginToSite(username, password)
    }

    useEffect(() => {        
        if(userInfo)
          setRedirect(true)
    }, [userInfo]);

    useEffect(() => {        
        if(error)
        addToast(error, { appearance: 'error', autoDismiss: true })
      }, [error]);

    useEffect(() => {        
        if(getToken()){
            dispatch(authenticateUserSession());
        }
    }, []);

    const classes = useStyles()

    return (
        <div className="loginForm">
            {redirect ? (
                <Redirect from="/login" to="/admin/dashboard" />
            ) : (
                false
            )}
            <GridContainer>
                <GridItem xs={11} sm={8} md={5}>
                    <form onSubmit={handleFormSubmit}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>
                                    Login Form
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Username"
                                            id="username"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            name="username"
                                            inputProps={{
                                                value: username,
                                                inputProps: {
                                                    onChange: e =>
                                                        setUserName(
                                                            e.target.value
                                                        ),
                                                    'aria-label': 'Search',
                                                    required: true
                                                }
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Password"
                                            id="password"
                                            placeholder="Enter password"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            name="password"
                                            inputProps={{
                                                value: password,
                                                type: 'password',
                                                inputProps: {
                                                    onChange: e =>
                                                        setPassword(
                                                            e.target.value
                                                        ),
                                                    required: true
                                                }
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter className="centerButton">
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    loginToSite: (username, password) =>
        dispatch(loginToSite(username, password))
})
export default connect(null, mapDispatchToProps)(withToastManager(Login))
