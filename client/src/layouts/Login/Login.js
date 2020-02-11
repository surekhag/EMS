import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { Radio, RadioGroup } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { loginToSite } from '../../actions/loginAction'
import { connect } from 'react-redux'
//@material-ui/icons
import Brightness1Icon from '@material-ui/icons/Brightness1'
// core components
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import './Login.css'
import { Redirect } from 'react-router-dom'

import Interceptors from '../../helpers/interceptors.js'

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

function Login(props) {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userrole, setUserRole] = useState('Admin')
    const [redirect, setRedirect] = useState(false)

    let status = useSelector(state => state.loginReducer.loginStatus)

    const handleInputChange = e => {
        e.preventDefault()
        props.loginToSite(username, password, userrole)
    }

    useEffect(() => {
        if (status && status.status && status.data) {
            localStorage.setItem('token', status.data.token)
            console.log('user available')
            Interceptors(status.data.token)
            setRedirect(true)
        } else if (status && status.status && status.data === null) {
            console.log('user not available')
        }
    }, [status])
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
                    <form onSubmit={handleInputChange}>
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
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <div className="radioContainer">
                                            <RadioGroup
                                                defaultValue="Admin"
                                                className="radioButtons"
                                                aria-label="userType"
                                                name="userType"
                                            >
                                                <FormControlLabel
                                                    value="Admin"
                                                    control={
                                                        <Radio
                                                            checkedIcon={
                                                                <Brightness1Icon
                                                                    className={
                                                                        classes.radioChecked
                                                                    }
                                                                />
                                                            }
                                                            icon={
                                                                <Brightness1Icon
                                                                    className={
                                                                        classes.radioUnchecked
                                                                    }
                                                                />
                                                            }
                                                            classes={{
                                                                checked:
                                                                    classes.radio,
                                                                root:
                                                                    classes.root
                                                            }}
                                                        />
                                                    }
                                                    label="Admin"
                                                    onChange={() =>
                                                        setUserRole('Admin')
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="User"
                                                    control={
                                                        <Radio
                                                            checkedIcon={
                                                                <Brightness1Icon
                                                                    className={
                                                                        classes.radioChecked
                                                                    }
                                                                />
                                                            }
                                                            icon={
                                                                <Brightness1Icon
                                                                    className={
                                                                        classes.radioUnchecked
                                                                    }
                                                                />
                                                            }
                                                            classes={{
                                                                checked:
                                                                    classes.radio,
                                                                root:
                                                                    classes.root
                                                            }}
                                                        />
                                                    }
                                                    label="User"
                                                    onChange={() =>
                                                        setUserRole('User')
                                                    }
                                                />
                                            </RadioGroup>
                                        </div>
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
    loginToSite: (username, password, userrole) =>
        dispatch(loginToSite(username, password, userrole))
})
export default connect(null, mapDispatchToProps)(Login)
