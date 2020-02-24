import React, { useState,useEffect } from 'react'
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
import Grid from '@material-ui/core/Grid'
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import { Formik, Form, ErrorMessage } from 'formik';
import { useSelector , useDispatch} from 'react-redux'
import * as Yup from 'yup';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
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
        minWidth: 120
    },
    selectEmpty: {
        marginTop: 10
    },
    error :{
        color: 'red'
    }
}
const useStyles = makeStyles(styles)
const Employee = () => {
    const classes = useStyles()
   

    let employeeData = useSelector(state => state.EmployeeInfo.employeeData)
    useEffect(()=>{
        console.log(employeeData);
    },[employeeData]);

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
    const userRole =['Admin', 'Manager', 'Human Resource'];

    // todo

    const datatoloop = [
        { id: 100, subject: 'math' },
        { id: 101, subject: 'physics' },
        { id: 'chemistry', subject: 'chemistry' }
    ]

    const submitFormValues = (values) => {
        console.log("in submit", employeeData);
        // dispatch(createPeerReview(values));
    }

    const userDataValidation = Yup.object().shape({
            employee_id : Yup.string()
            .required('Required'),
            employee_id : Yup.string()
           .required('Required'),
            email : Yup.string()
           .required('Required'),
            userName : Yup.string()
           .required('Required'),
            password : Yup.string()
           .required('Required'),
            firstname  : Yup.string()
           .required('Required'),
            lastname : Yup.string()
           .required('Required'),
            middlename : Yup.string()
           .required('Required'),
            address1 : Yup.string()
           .required('Required'),            
            city : Yup.string()
           .required('Required'),
            zip : Yup.string()
           .required('Required'),
            state : Yup.string()
           .required('Required'),
            country : Yup.string()
           .required('Required'),
            gender: Yup.string()
           .required('Required'),
            dateofbirth : Yup.string()
           .required('Required'),
            dateofjoining : Yup.string()
           .required('Required'),
            status: Yup.string()
           .required('Required'),
            experience_at_joining : Yup.string()
           .required('Required'),
            work_location : Yup.string()
            .required('Required'),
            timezone : Yup.string()
           .required('Required'),
            shift_timing : Yup.string()
           .required('Required'),
            designation : Yup.string()
           .required('Required'),
            employment_status : Yup.string()
           .required('Required'),
            userRole  : Yup.string()
           .required('Required'),
            reporting_manager : Yup.string()
           .required('Required'),
            functional_manager  : Yup.string()
           .required('Required'),
            skills : Yup.string()
           .required('Required'),
            
    });

    return (
        <GridContainer>
        <Formik
        initialValues={{
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
            status: '',
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
        }}
        onSubmit={(values, { setSubmitting }) => {      
            console.log("onSubmit")      ;
            submitFormValues(values);
            setSubmitting(false)
        }}
        validationSchema={userDataValidation}
    >
        {({ isSubmitting, values, setFieldValue, handleChange }) => (
            <GridItem xs={12} sm={12} md={12}>
 

 <Card id="add_new_employee">
     <Form>
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
                        //required : true
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
                        //required : true
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
                        //required : true
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
                        //required : true
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
                        //required : true
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
                        //required : true
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
                        //required : true
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
                        //required : true
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
             <GridItem xs={12} sm={12} md={3}>
                 <FormControl
                     className={classes.formControl}
                 >
                     <InputLabel htmlFor="city">
                         {' '}
                         City
                     </InputLabel>
                     <Select
                         value={values.city}
                         onChange={handleChange}
                         inputProps={{
                             name: 'city',
                             id: 'city'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {datatoloop.map(item => {
                             return (
                                 <MenuItem value={item.subject}>
                                     {item.subject}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='city'/> 
                 </div>
             </GridItem>

             <GridItem xs={12} sm={12} md={3}>
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
                         {datatoloop.map(item => {
                             return (
                                 <MenuItem value={item.subject}>
                                     {item.subject}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='state'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={3}>
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
                         inputProps={{
                             name: 'country',
                             id: 'country'
                         }}
                     >
                         <MenuItem value="">
                             <em>None</em>
                         </MenuItem>
                         {datatoloop.map(item => {
                             return (
                                 <MenuItem value={item.subject}>
                                     {item.subject}
                                 </MenuItem>
                             )
                         })}
                     </Select>
                 </FormControl>
                   <div className = {classes.error}>
                 <ErrorMessage name='country'/>
                 </div> 
             </GridItem>
             <GridItem xs={12} sm={12} md={3}>
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
                        //required : true
                    }}
                 />
                   <div className = {classes.error}>
                 <ErrorMessage name='zip'/> 
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
                 <MuiPickersUtilsProvider
                     utils={DateFnsUtils}
                 >
                     <Grid container justify="space-around">
                         <KeyboardDatePicker
                             disableToolbar
                             variant="inline"
                             format="MM/dd/yyyy"
                             margin="normal"
                             name="dateofbirth"                                                
                             label="Date Of Birth"
                            //  value={selectedDate}
                            //  onChange={handleDateChange}
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
                         />
                     </Grid>
                 </MuiPickersUtilsProvider>
                   <div className = {classes.error}>
                 <ErrorMessage name='dateofbirth'/>
                 </div> 
             </GridItem>

             <GridItem xs={12} sm={12} md={6}>
                 <MuiPickersUtilsProvider
                     utils={DateFnsUtils}
                 >
                     <Grid container justify="space-around">
                         <KeyboardDatePicker
                             disableToolbar
                             variant="inline"
                             format="MM/dd/yyyy"
                             margin="normal"
                             name="dateofjoining"
                             label="Date Of Joining"
                            //  value={selectedDate}
                            //  onChange={handleDateChange}
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
                        //required : true
                    }}
                 />
                <div className = {classes.error}>
                 <ErrorMessage name='experience_at_joining'/> 
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
                         {datatoloop.map(item => {
                             return (
                                 <MenuItem value={item.subject}>
                                     {item.subject}
                                 </MenuItem>
                             )
                         })}
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
                         {datatoloop.map(item => {
                             return (
                                 <MenuItem value={item.subject}>
                                     {item.subject}
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
                     labelText="Skills"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.skills,
                        name: 'skills',
                        onChange: handleChange,
                        //required : true
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
export default Employee
