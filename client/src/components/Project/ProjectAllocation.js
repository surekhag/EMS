import React, { useState,useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../Grid/GridContainer.js'
import GridItem from '../Grid/GridItem.js'
import Card from '../Card/Card.js'
import CardHeader from '../Card/CardHeader.js'
import CardBody from '../Card/CardBody.js'
import CardFooter from '../Card/CardFooter.js'
import Button from '../CustomButtons/Button.js'
import CustomInput from '../CustomInput/CustomInput.js'
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
import { addNewProject, clearProjectMsg, updateProject} from '../../actions/projectAction'
import withAuth from '../../HOC/withAuth'
import {loadAllEmployeeData} from '../../actions/employeeAction'
import {gender, work_location, shift_timing,designation, employment_status, userRole, countryData} from '../../constants';
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
const ProjectAllocation = (props) => {    
    const {setPageView, projectToUpdate} = props;
    const classes = useStyles();
    const { addToast } = useToasts()
    const dispatch = useDispatch();
    
    let error = useSelector(state => state.projectReducer.error);
    let addNewProjectStatus = useSelector(state => state.projectReducer.addNewProjectStatus);
    let updateProjectStatus = useSelector(state => state.projectReducer.updateProjectStatus);
    let updateProjectError = useSelector(state => state.projectReducer.updateProjectError);
    const projectForm = useRef(null);
   
      useEffect(()=>{
        if(addNewProjectStatus){
            addToast(addNewProjectStatus, { appearance: 'success', autoDismiss: true });
            projectForm.current.reset();
            dispatch(clearProjectMsg());
            setPageView("projectListing");
        }
        if(updateProjectStatus){            
            addToast(updateProjectStatus, { appearance: 'success', autoDismiss: true });
            projectForm.current.reset();
            dispatch(clearProjectMsg());            
            if(props)
                props.setUpdateAction(); 
        }
    }, [addNewProjectStatus,updateProjectStatus,  addToast]);

    useEffect(() => {        
        if(error)
        {
            addToast(error, { appearance: 'error', autoDismiss: true })
            dispatch(clearProjectMsg());            
        }

        if(updateProjectError){
            addToast(updateProjectError, { appearance: 'error', autoDismiss: true })
            dispatch(clearProjectMsg());            
        }        
      }, [error,updateProjectError,addToast]);
   
    const submitFormValues = (values) => {        
        if(projectToUpdate){
            const id= projectToUpdate[0]._id;
            dispatch(updateProject(values, id));
        }
        else{
            dispatch(addNewProject(values));
        }        
    }
   

       let initialValues;
       if(projectToUpdate){           
        initialValues = {
            title: projectToUpdate[0].title,
            description: projectToUpdate[0].description,
            client: projectToUpdate[0].client,
            client_location: projectToUpdate[0].client_location,           
            startdate : projectToUpdate[0].startdate,
            enddate :projectToUpdate[0].enddate,
            status: projectToUpdate[0].status,            
            technology: projectToUpdate[0].technology,
            type : projectToUpdate[0].type,
        }
        console.log(initialValues);
       }
       else {
        initialValues ={
           title: '',
           description: '',
           client:'',
           client_location:'',           
           startdate : new Date(),
           enddate : new Date(),
           status: 'Active',            
           technology:'',
           type : '',
        };
       }

    const handleProjectListView =()=>{        
        props.setUpdateAction();        
    }

    let projectDataValidation = Yup.object().shape({
        title  : Yup.string()
        .required('Project Title is required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
        description : Yup.string()
        .min(2, 'Too Short!')
        .max(150, 'Too Long!')
        .required('Description is required'),
        client  : Yup.string()
        .required('Client is required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),             
        client_location  : Yup.string()
        .required('Client Location is required'), 
        type  : Yup.string()
        .required('Project Type is required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),     
        technology  : Yup.string()
        .required('Technology is required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),          
        startdate : Yup.date('Invalid date')
        .required('Start Date is required')
        .typeError(''),      
        enddate : Yup.date('Invalid date')
        .required('Start Date is required')
        .typeError('')
        .test('', 'Must be greater than Start Date', function(value) {
            const startdate = this.parent.startdate
            return value >= startdate
          })
});

    return (
        <GridContainer>
        <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {   
            console.log(values)         ;
            submitFormValues(values);
            setSubmitting(false)
        }}
        validationSchema={projectDataValidation}
    >
        {({ isSubmitting, values, setFieldValue, handleChange }) => (
            <GridItem xs={12} sm={12} md={12}>
 

 <Card>
     <Form ref={projectForm}>
     <CardHeader color="primary">
         <h4 className={classes.cardTitleWhite}>
             {' '}
        {projectToUpdate ? 'UPDATE PROJECT' : 'ADD PROJECT'}
             {' '}
         </h4>
     </CardHeader>

     <CardBody>
         <GridContainer>
      
             <GridItem xs={12} sm={12} md={6}>



                 project allocation
                 <CustomInput
                     labelText="Project Title"                                   
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.title,
                        name: 'title',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>               
                 <ErrorMessage name='title'/>
                 </div>
             </GridItem>
           
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Description"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.description,
                        name: 'description',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>
                 <ErrorMessage name='description'/> 
                 </div>
             </GridItem>
             
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Client"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.client,
                        name: 'client',
                        onChange: handleChange,
                    }}
                 />
               <div className = {classes.error}>
                 <ErrorMessage name='client'/> 
                 </div>
             </GridItem>
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Client Location"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.client_location,
                        name: 'client_location',
                        onChange: handleChange,
                    }}
                 />
                   <div className = {classes.error}>
                 <ErrorMessage name='client_location'/> 
                 </div>
             </GridItem>
           
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Technology"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.technology,
                        name: 'technology',
                        onChange: handleChange,
                        required : false
                    }}
                 />
                  <div className = {classes.error}>
                 <ErrorMessage name='technology'/>
                 </div> 
             </GridItem>
             
             <GridItem xs={12} sm={12} md={6}>
                 <CustomInput
                     labelText="Project Type"
                     formControlProps={{
                         fullWidth: true
                     }}
                     inputProps={{
                        value: values.type,
                        name: 'type',
                        onChange: handleChange,
                        required : false
                    }}
                 />
                  <div className = {classes.error}>
                 <ErrorMessage name='type'/>
                 </div> 
             </GridItem>


             <GridItem xs={12} sm={12} md={6}>
                 <MuiPickersUtilsProvider
                     utils={DateFnsUtils}
                 >
                     <Grid container justify="flex-start" style = {{ paddingLeft: 11, paddingRight: 11,}}>
                         <KeyboardDatePicker
                             disableToolbar
                             variant="inline"
                             format="MM/dd/yyyy"
                             margin="normal"
                             name="startdate"                                                
                             label="Start Date"
                            value={values.startdate}
                            onChange={date =>
                                setFieldValue(
                                    'startdate',
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
                 <ErrorMessage name='startdate'/>
                 </div> 
             </GridItem>

             <GridItem xs={12} sm={12} md={6}>
                 <MuiPickersUtilsProvider
                     utils={DateFnsUtils}
                 >
                     <Grid container justify="flex-start" style = {{ paddingLeft: 11, paddingRight: 11,}}>
                         <KeyboardDatePicker
                             disableToolbar
                             variant="inline"
                             format="MM/dd/yyyy"
                             margin="normal"
                             name="enddate"                                                
                             label="End Date"
                            value={values.enddate}
                            onChange={date =>
                                setFieldValue(
                                    'enddate',
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
                 <ErrorMessage name='enddate'/>
                 </div> 
             </GridItem>

            
         </GridContainer>
     </CardBody>

     <CardFooter>
         {projectToUpdate ? <>
            <GridItem xs={12} sm={12} md={6}>
         <Button id='update' type="submit" color="primary" disabled={isSubmitting}>UPDATE PROJECT</Button>
         <Button  color="primary" disabled={isSubmitting} onClick={handleProjectListView}>cancel</Button>
         </GridItem>
         </>        
         :
         <Button id='add' type="submit" color="primary" disabled={isSubmitting}>ADD PROJECT</Button>
          }
         
     </CardFooter>     
     </Form>
 </Card>
</GridItem>

)}
</Formik>
</GridContainer>
       
    )
}
export default ProjectAllocation;
