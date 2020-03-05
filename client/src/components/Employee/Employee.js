import React, { useState,useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Button from '../../components/CustomButtons/Button.js'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Select from '@material-ui/core/Select'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import InputLabel from '@material-ui/core/InputLabel'
import { withToastManager, useToasts } from 'react-toast-notifications'
import Grid from '@material-ui/core/Grid'
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import { Formik, Form, ErrorMessage } from 'formik';
import { useSelector , useDispatch} from 'react-redux';
import { addNewUser, clearUserStatus } from '../../actions/userActions'
import withAuth from '../../HOC/withAuth'
import {loadAllEmployeeData} from '../../actions/employeeAction'
import * as Yup from 'yup';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import { startOfDay } from 'date-fns'
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
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: 11,
        minWidth: 120,
        wrap: 'nowrap',
        fullWidth :'true',
        display:'flex',

    },
    selectEmpty: {
        marginTop: 10
    },
    error :{
        color: 'red'
    },
    dateStyle : {
        paddingLeft: 11,
        paddingRight: 11,
    }    
}

const useStyles = makeStyles(styles)
const Employee = (props) => {
    const [managers, setManagers] = useState();
    const {setPageView} = props;
    const classes = useStyles();
    const { addToast } = useToasts()
    const dispatch = useDispatch();
    let employeeData = useSelector(state => state.EmployeeInfo.employeeData);
    let error = useSelector(state => state.userReducer.error);
    let addNewUserStatus = useSelector(state => state.userReducer.addNewUserStatus);
    const userForm = useRef(null);
   
  
    //Load all emp info
    useEffect(()=>{
        dispatch(loadAllEmployeeData());        
    },[]);

    useEffect(()=>{        
        if(employeeData){
            let emp =employeeData.data.data;
           let managers = emp.filter((item)=>{
                if (item.userRole == 'Manager')
                return item;                
            });
            setManagers(managers);
        }
    },[employeeData]);
    

    useEffect(()=>{
        if(addNewUserStatus){
            addToast(addNewUserStatus, { appearance: 'success', autoDismiss: true });
            userForm.current.reset();
            dispatch(clearUserStatus());
            setPageView("employeeListing");
        }
    }, [addNewUserStatus, addToast]);

    useEffect(() => {        
        if(error)
        addToast(error, { appearance: 'error', autoDismiss: true })
      }, [error,addToast]);

    //todo add constant array in different file
    const gender =['Male', 'Female'];

    const work_location =[
        {id : 'IN', location : 'India'},
        {id: 'US', location :'United States'},
        {id :'BR', location : 'Brazil'},
    ];
    const shift_timing = ['9 to 6', '8 to 5', '11 to 8'];
    const status = ['Active','InActive'];
    const designation= [
        'Junior Developer',
        'Developer',
        'Senior Developer',
        'Junior Quality Analyst',
        'Quality Analyst',
        'Senior Quality Analyst',
        'Architect',
        'Human Resource',
        'Admin',
        'Scrum Master',
        'Technology Lead',
        'Senior Architect',    
    ];

    const employment_status =['Part Time', 'Full time', 'Contractor'];
    const userRole =['Admin', 'Manager', 'Human Resource', 'Employee'];


    const countryData = [{"country":"IN", "name" : "India","states":[{"code":"DD","name":"Daman and Diu"},{"code":"JK","name":"Jammu and Kashmir"},{"code":"DL","name":"Delhi"},{"code":"HP","name":"Himachal Pradesh"},{"code":"PY","name":"Pondicherry"},{"code":"DN","name":"Dadra and Nagar Haveli"},{"code":"HR","name":"Haryana"},{"code":"WB","name":"West Bengal"},{"code":"BR","name":"Bihar"},{"code":"KA","name":"Karnataka"},{"code":"UK","name":"Uttarakhand"},{"code":"SK","name":"Sikkim"},{"code":"GA","name":"Goa"},{"code":"MH","name":"Maharashtra"},{"code":"UP","name":"Uttar Pradesh"},{"code":"ML","name":"Meghalaya"},{"code":"KL","name":"Kerala"},{"code":"MN","name":"Manipur"},{"code":"GJ","name":"Gujarat"},{"code":"MP","name":"Madhya Pradesh"},{"code":"OR","name":"Orissa"},{"code":"CG","name":"Chhattisgarh"},{"code":"Chandigarh","name":"Chandigarh"},{"code":"MZ","name":"Mizoram"},{"code":"AP","name":"Andhra Pradesh"},{"code":"AR","name":"Arunachal Pradesh"},{"code":"AS","name":"Assam"},{"code":"PB","name":"Punjab"},{"code":"RJ","name":"Rajasthan"},{"code":"TN","name":"Tamil Nadu"},{"code":"JH","name":"Jharkhand"},{"code":"NL","name":"Nagaland"},{"code":"TR","name":"Tripura"}]},
    {"country":"US","name" : "United States","states":[{"code":"DE","name":"Delaware"},{"code":"HI","name":"Hawaii"},{"code":"PR","name":"Puerto Rico"},{"code":"TX","name":"Texas"},{"code":"PW","name":"Palau"},{"code":"MA","name":"Massachusetts"},{"code":"MD","name":"Maryland"},{"code":"IA","name":"Iowa"},{"code":"ME","name":"Maine"},{"code":"MH","name":"Marshall Islands"},{"code":"ID","name":"Idaho"},{"code":"MI","name":"Michigan"},{"code":"UT","name":"Utah"},{"code":"MN","name":"Minnesota"},{"code":"MO","name":"Missouri"},{"code":"MP","name":"Northern Mariana Islands"},{"code":"IL","name":"Illinois"},{"code":"IN","name":"Indiana"},{"code":"MS","name":"Mississippi"},{"code":"MT","name":"Montana"},{"code":"AK","name":"Alaska"},{"code":"AL","name":"Alabama"},{"code":"VA","name":"Virginia"},{"code":"AR","name":"Arkansas"},{"code":"AS","name":"American Samoa"},{"code":"VI","name":"Virgin Islands"},{"code":"NC","name":"North Carolina"},{"code":"ND","name":"North Dakota"},{"code":"NE","name":"Nebraska"},{"code":"RI","name":"Rhode Island"},{"code":"AZ","name":"Arizona"},{"code":"NH","name":"New Hampshire"},{"code":"NJ","name":"New Jersey"},{"code":"VT","name":"Vermont"},{"code":"NM","name":"New Mexico"},{"code":"FL","name":"Florida"},{"code":"FM","name":"Federated States Of Micronesia"},{"code":"NV","name":"Nevada"},{"code":"WA","name":"Washington"},{"code":"NY","name":"New York"},{"code":"SC","name":"South Carolina"},{"code":"SD","name":"South Dakota"},{"code":"WI","name":"Wisconsin"},{"code":"OH","name":"Ohio"},{"code":"GA","name":"Georgia"},{"code":"OK","name":"Oklahoma"},{"code":"CA","name":"California"},{"code":"WV","name":"West Virginia"},{"code":"WY","name":"Wyoming"},{"code":"OR","name":"Oregon"},{"code":"KS","name":"Kansas"},{"code":"CO","name":"Colorado"},{"code":"GU","name":"Guam"},{"code":"KY","name":"Kentucky"},{"code":"CT","name":"Connecticut"},{"code":"PA","name":"Pennsylvania"},{"code":"LA","name":"Louisiana"},{"code":"TN","name":"Tennessee"},{"code":"DC","name":"District Of Columbia"}]}];


    const getStates =(value)=>{        
        if(value === null)
        return [];
        
        let states = countryData.filter((item)=>{            
            if(item.country == value)
            {
              return item            
            }
        })
        return states.length > 0 ? states[0].states: [];        
    }     
    const submitFormValues = (values) => {
        dispatch(addNewUser(values));
    }

    //todo update user initial val set here
    const initialValues = {
        employee_id : '',
        email : '',
        userName : '',
        password : '',
        firstname  : '',
        lastname : '',
        middlename : '',
        address1 : '',
        address2 : '',
        city : '',
        zip : '',
        state : '',
        country : '',
        gender: '',
        dateofbirth : new Date(),
        dateofjoining : new Date(),
        status: 'ACTIVE',
        experience_at_joining : '',
        work_location :'',
        timezone : '',
        shift_timing : '',
        designation : '',
        employment_status : '',
        userRole  : '',
        reporting_manager : '',
        functional_manager  : '',
        skills :'',
        certifications:'',
        achievements:'',
    };

    const userDataValidation = Yup.object().shape({
            employee_id : Yup
            .number()            
            .typeError('Employee Id must be a number')
            .required('Employee Id is required'),           
             email : Yup.string()
            .required('Email is required')
            .email('Invalid email'),
            userName : Yup.string()
            .min(8, 'UserName must be at least 8 characters long!')
            .required('UserName is required'),
            password : Yup.string()
            .min(8, 'Password must be at least 8 characters long!')
            .required('Password is required'),
            firstname  : Yup.string()
            .required('Firstname is required')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
            lastname : Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
           .required('Lastname is required'),
            middlename : Yup.string()
           .required('Middlename is required'),
            address1 : Yup.string()
            .min(2, 'Too Short!')
           .required('Address1 is required'),            
            city : Yup.string()
           .required('City is required'),
            zip : Yup.string()
            .min(6, 'Invalid Zip Code')
           .required('Zip is required'),
            state : Yup.string()
           .required('State is required'),
            country : Yup.string()
           .required('Country is required'),
            gender: Yup.string()
           .required('Gender is required'),
            dateofbirth : Yup.date('Invalid date')
           .required('Date Of Birth is required')
           .typeError('')
           .test('', 'Enter valid date', function(value) {                    
            const date = new Date();       
            return  value < date
            })
           .test('', 'Age must be greater than 18', function(value) {            
               const dt1=value;
            const date = new Date();    
            const result =  Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()) ) /(1000 * 60 * 60 * 24));
            return Math.floor((result/30)/12) > 17
            }),
            dateofjoining : Yup.date('Invalid date')
            .typeError('')
            .test('', 'Enter valid date', function(value) {                    
                const date = new Date();                
                return (value.getFullYear()- date.getFullYear()) < 2
                })
           .required('Date Of Joining is required'),
            status: Yup.string()
           .required('Status is required'),
            experience_at_joining : Yup
            .number()
            .typeError('Experience must be in numbers')
           .required('Experience At Joining is required'),
            work_location : Yup.string()
            .required('Work Location is required'),
            timezone : Yup.string()
           .required('Timezone is required'),
            shift_timing : Yup.string()
           .required('Shift Timing is required'),
            designation : Yup.string()
           .required('Designation is required'),
            employment_status : Yup.string()
           .required('Employment Status is required'),
            userRole  : Yup.string()
           .required('User Role is required'),
            reporting_manager : Yup.string()
           .required('Reporting Manager is required'),
            functional_manager  : Yup.string()
           .required('Functional Manager is required'),
            skills : Yup.string()
           .required('Skills are required'),
    });

    return (
        <GridContainer>
        <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {            
            submitFormValues(values);
            setSubmitting(false)
        }}
        validationSchema={userDataValidation}
    >
        {({ isSubmitting, values, setFieldValue, handleChange }) => (
            <GridItem xs={12} sm={12} md={12}>
 

 <Card id="add_new_employee">
     <Form ref={userForm}>
     <CardHeader color="primary">
         <h4 className={classes.cardTitleWhite}>
             {' '}
             ADD EMPLOYEE{' '}
         </h4>
     </CardHeader>

     <CardBody>
         <GridContainer>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Employee Id"                                   
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.employee_id,
                        name: 'employee_id',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>               
                 <ErrorMessage name='employee_id'/>
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Email Address"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.email,
                        name :  'email',
                        onChange: handleChange,
                    }}
                 />
                    <div className = {classes.error}>
                 <ErrorMessage name='email'/>                 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="UserName"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.userName,
                        name: 'userName',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>
                 <ErrorMessage name='userName'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Password"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.password,
                        name: 'password',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>
                 <ErrorMessage name='password'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={4}>
                 <CustomInput
                     labelText="Firstname"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.firstname,
                        name: 'firstname',
                        onChange: handleChange,
                    }}
                 />
               <div className = {classes.error}>
                 <ErrorMessage name='firstname'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={4}>
                 <CustomInput
                     labelText="Middlename"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.middlename,
                        name: 'middlename',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>
                 <ErrorMessage name='middlename'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={4}>
                 <CustomInput
                     labelText="Lastname"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.lastname,
                        name: 'lastname',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>
                 <ErrorMessage name='lastname'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Address 1"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.address1,
                        name: 'address1',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>
                 <ErrorMessage name='address1'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Address 2"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.address2,
                        name: 'address2',
                        onChange: handleChange,
                        required : false
                    }}
                 />
             </GridItem>
             <GridItem xs={12} sm={12} md={4}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="country">
                         {' '}
                         Country
                     </InputLabel>
                     <Select
                         value={values.country}
                         onChange={handleChange}
                         onBlur= {e=>{                            
                            setFieldValue('state', '')
                        }
                    }
                         inputProps={{
                             name: 'country',
                             id: 'country'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {countryData.map(item => {
                             return (
                                 <MenuItem value={item.country}>
                                     {item.name}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='country'/>
                 </div> 
             </GridItem>           

             <GridItem xs={12} sm={12} md={4}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="state">
                         State
                     </InputLabel>
                     <Select
                         value={values.state}
                         onChange={handleChange}
                         inputProps={{
                             name: 'state',
                             id: 'state'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {countryData.map(item => {
                                
                                if(values.country && item.country == values.country){                                    
                                return (                                    
                                    getStates(values.country).map(item =>{                                        
                                if(item){
                                    return  <MenuItem value={item.code}>
                                                {item.name}                                       
                                            </MenuItem>
                                }                               
                            }      
                           )
                           )
                            }                         

                        }
                            )
                         }
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='state'/> 
                 </div>
             </GridItem>
            
             <GridItem xs={12} sm={12} md={4}>                
                  <CustomInput
                     labelText="City"
                     name="city"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.city,
                        name: 'city',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>
                 <ErrorMessage name='city'/> 
                 </div>
             </GridItem>

             <GridItem xs={12} sm={12} md={4}>
                 <CustomInput
                     labelText="Zip"
                     name="zip"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.zip,
                        name: 'zip',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>
                 <ErrorMessage name='zip'/> 
                 </div>
             </GridItem>
           
             <GridItem xs={12} sm={12} md={4}>
                 <MuiPickersUtilsProvider
                     utils={DateFnsUtils}
                 >
                     <Grid container justify="flex-start" style = {{ paddingLeft: 11, paddingRight: 11,}}>
                         <KeyboardDatePicker
                             disableToolbar
                             variant="inline"
                             format="MM/dd/yyyy"
                             margin="normal"
                             name="dateofbirth"                                                
                             label="Date Of Birth"
                            value={values.dateofbirth}
                            onChange={date =>
                                setFieldValue(
                                    'dateofbirth',
                                    date
                                )
                            }
                             KeyboardButtonProps={{
                                 'aria-label': 'change date'
                             }}
                             fullWidth
                         />
                     </Grid>
                 </MuiPickersUtilsProvider>
                   <div className = {classes.error}>
                 <ErrorMessage name='dateofbirth'/>
                 </div> 
             </GridItem>

             <GridItem xs={12} sm={12} md={4}>
                 <MuiPickersUtilsProvider
                     utils={DateFnsUtils}
                 >
                     <Grid container justify="flex-start" style = {{ paddingLeft: 11, paddingRight: 11,}}>
                         <KeyboardDatePicker
                             disableToolbar
                             variant="inline"
                             format="MM/dd/yyyy"
                             margin="normal"
                             name="dateofjoining"
                             label="Date Of Joining"
                            value={values.dateofjoining}
                            onChange={date =>
                                setFieldValue(
                                    'dateofjoining',
                                    date
                                )
                            }
                             KeyboardButtonProps={{
                                 'aria-label': 'change date'
                             }}
                             fullWidth
                         />
                     </Grid>
                 </MuiPickersUtilsProvider>
                   <div className = {classes.error}>
                 <ErrorMessage name='dateofjoining'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="gender">
                         {' '}
                         Gender
                     </InputLabel>
                     <Select
                         value={values.gender}
                         onChange={handleChange}
                         inputProps={{
                             name: 'gender',
                             id: 'gender'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {gender.map(item => {
                             return (
                                 <MenuItem value={item}>                                     
                                     {item}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='gender'/> 
                 </div>
             </GridItem>
            
            
             <GridItem xs={12} sm={12} md={6}>                                    
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="work_location">
                         {' '}
                         Work Location
                     </InputLabel>
                     <Select
                         value={values.work_location}
                         onChange={handleChange}
                         inputProps={{
                             name: 'work_location',
                             id: 'work_location'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {work_location.map(item => {
                             return (
                                 <MenuItem value={item.id}>
                                     {item.location}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='work_location'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="timezone">
                         {' '}
                         Timezone
                     </InputLabel>
                     <Select
                         value={values.timezone}
                         onChange={handleChange}
                         inputProps={{
                             name: 'timezone',
                             id: 'timezone'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {work_location.map(item => {
                             return (
                                 <MenuItem value={item.location}>
                                     {item.location}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='timezone'/> 
                 </div>
             </GridItem>
           
             <GridItem xs={12} sm={12} md={6}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="shift_timing">
                     Shift Timing{' '}
                     </InputLabel>
                     <Select
                         value={values.shift_timing}
                         onChange={handleChange}
                         inputProps={{
                             name: 'shift_timing',
                             id: 'shift_timing'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {shift_timing.map(item => {
                             return (
                                 <MenuItem value={item}>
                                     {item}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='shift_timing'/> 
                 </div>
             </GridItem>

             <GridItem xs={12} sm={12} md={6}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="designation">
                         Designation{' '}
                     </InputLabel>
                     <Select
                         value={values.designation}
                         onChange={handleChange}
                         inputProps={{
                             name: 'designation',
                             id: 'designation'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {designation.map(item => {
                             return (
                                 <MenuItem value={item}>
                                     {item}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='designation'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="employment_status">
                         {' '}
                         Employment Status
                     </InputLabel>
                     <Select
                         value={values.employment_status}
                         onChange={handleChange}
                         inputProps={{
                             name: 'employment_status',
                             id: 'employment_status'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {employment_status.map(item => {
                             return (
                                 <MenuItem value={item}>
                                     {item}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='employment_status'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="userRole">
                         {' '}
                         User Role
                     </InputLabel>
                     <Select
                         value={values.userRole}
                         onChange={handleChange}
                         inputProps={{
                             name: 'userRole',
                             id: 'userRole'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {userRole.map(item => {
                             return (
                                 <MenuItem value={item}>
                                     {item}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='userRole'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="reporting_manager">
                         Reporting Manager
                     </InputLabel>
                     <Select
                         value={values.reporting_manager}
                         onChange={handleChange}
                         inputProps={{
                             name: 'reporting_manager',
                             id: 'reporting_manager'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {managers ?  managers.map(item => {
                             return (
                                 <MenuItem value={item.employee_id}>
                                     {item.firstname + " " + item.lastname}
                                 </MenuItem>
                             )
                         }) : null}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='reporting_manager'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="functional_manager">
                         {' '}
                         Functional Manager
                     </InputLabel>
                     <Select
                         value={values.functional_manager}
                         onChange={handleChange}
                         inputProps={{
                             name: 'functional_manager',
                             id: 'functional_manager'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {managers && managers.map(item => {
                             return (
                                 <MenuItem value={item.employee_id}>
                                     {item.firstname + " " + item.lastname}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='functional_manager'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Experience At Joining"
                     name="experience_at_joining"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.experience_at_joining,
                        name: 'experience_at_joining',
                        onChange: handleChange,
                    }}
                 />
                <div className = {classes.error}>
                 <ErrorMessage name='experience_at_joining'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Skills"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.skills,
                        name: 'skills',
                        onChange: handleChange,
                    }}
                 />
                    <div className={classes.error}>
                 <ErrorMessage name='skills'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Certifications"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.certifications,
                        name: 'certifications',
                        onChange: handleChange,
                        required : false
                    }}
                 />                 
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Achievements"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.achievements,
                        name: 'achievements',
                        onChange: handleChange,
                        required : false
                    }}
                 />
             </GridItem>

             {/* Display for update user only */}
             {/* <GridItem xs={12} sm={12} md={6}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="status">
                         {' '}
                         Status
                     </InputLabel>
                     <Select
                         value={values.status}
                         onChange={handleChange}
                         inputProps={{
                             name: 'status',
                             id: 'status'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {status.map(item => {
                             return (
                                 <MenuItem value={item}>
                                     {item}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                 <div className = {classes.error}>
                 <ErrorMessage name='status'/> 
                 </div>
             </GridItem> */}
         </GridContainer>
     </CardBody>

     <CardFooter>
         <Button type="submit" color="primary" disabled={isSubmitting}>ADD EMPLOYEE</Button>
     </CardFooter>
     </Form>
 </Card>
</GridItem>

)}
</Formik>
</GridContainer>
       
    )
}
export default withAuth(withToastManager(Employee));
