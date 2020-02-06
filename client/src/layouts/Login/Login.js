import React, {useState} from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Radio , RadioGroup }from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { loginToSite } from '../../actions/loginAction';
import { connect } from 'react-redux';
//@material-ui/icons
import Check from "@material-ui/icons/Check";
import Brightness1Icon from '@material-ui/icons/Brightness1';
// core components
import checkboxAdnRadioStyle from "../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import './Login.css';
import Input from "@material-ui/core/Input";
import {Redirect} from 'react-router-dom';

const styles = {
    ...checkboxAdnRadioStyle,
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

function Login(props) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (e)=>{
  e.preventDefault();  
  // setRedirect(true);
  props.loginToSite(username,password);  
  }

  const classes = useStyles();

  return (
    <div className="loginForm">
      {/* {redirect ? <Redirect  from= '/login' to="/admin/dashboard" /> : false} */}
      <GridContainer>
        <GridItem xs={11} sm={8} md={5}>
          <form onSubmit={handleInputChange}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Login Form</h4>              
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
                    name='username'                    
                    inputProps={{
                      value: username,                    
                      inputProps: {                        
                        onChange : (e)=> setUserName(e.target.value),
                        "aria-label": "Search", 
                        // pattern : '/^[a-zA-Z0-9.\-_$@*!]{3,30}$/',
                        // type : 'email',
                        // pattern : '^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$',
                        title : 'Enter a valid Username',
                        required : true                     
                      }
                    }}                                         
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    placeholder='Enter password'
                    formControlProps={{
                      fullWidth: true
                    }}
                    name = 'password'
                    inputProps={{
                      value: password,                      
                      type : 'password',
                      inputProps: {                        
                        onChange : (e)=> setPassword(e.target.value),
                        // "aria-label": "Search",
                        // pattern : '/^[a-zA-Z0-9.\-_$@*!]{3,30}$/',
                        required : true                      
                      }
                    }}                    
                  />
                </GridItem>
              </GridContainer>                 
              <GridContainer>               
                <GridItem xs={12} sm={12} md={12}>
                  <div className="radioContainer">
                  <RadioGroup defaultValue = 'admin' className="radioButtons" aria-label="userType" name="userType">
                       <FormControlLabel value="admin" control={<Radio 
                                                    checkedIcon={<Brightness1Icon className={classes.radioChecked} />}
                                                    icon={<Brightness1Icon className={classes.radioUnchecked} />}
                                                    classes={{
                                                    checked: classes.radio,
                                                    root: classes.root
                                                }}
                        />} label="Admin" />
                         <FormControlLabel value="user" control={<Radio 
                                                    checkedIcon={<Brightness1Icon className={classes.radioChecked} />}
                                                    icon={<Brightness1Icon className={classes.radioUnchecked} />}
                                                    classes={{
                                                    checked: classes.radio,
                                                    root: classes.root
                                                }}
                        />} label="User" />
                    </RadioGroup>
                  </div>                   
                </GridItem>
              </GridContainer>            
            </CardBody>
            <CardFooter className ="centerButton">
              <Button type="submit" color="primary">Login</Button>
            </CardFooter>
          </Card>
          </form>
        </GridItem>     
      </GridContainer>
    </div>
  );
}

const mapStateToProps= (state)=>({
loginStatus : state.loginStatus,
loginError : state.loginError
});

const mapDispatchToProps = (dispatch)=>({
  loginToSite : (username, password) => dispatch(loginToSite(username, password))
 })
export default connect(mapStateToProps, mapDispatchToProps)(Login);