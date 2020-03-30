import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import Button from '../CustomButtons/Button'
import CustomInput from '../CustomInput/CustomInput'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { withToastManager, useToasts } from 'react-toast-notifications'
import Grid from '@material-ui/core/Grid'
import { Formik, Form, ErrorMessage } from 'formik'
import { projectStyles } from './styles'
import { useSelector, useDispatch } from 'react-redux'
import {
  addNewProject,
  clearProjectMsg,
  updateProject
} from '../../actions/projectAction'
import * as Yup from 'yup'
import {
  addProjectError,
  addNewProjectStatusMsg,
  updateProjectStatusMsg,
  updateProjectErrorMsg
} from '../../selectors/projectSelectors'
import {
  yupRequired,
  yupRequiredNumber,
  yupRequiredDate
} from '../../helpers/yupValidations'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

const styles = projectStyles
const useStyles = makeStyles(styles)
const Project = props => {
  const { setPageView, projectToUpdate } = props
  const classes = useStyles()
  const { addToast } = useToasts()
  const dispatch = useDispatch()

  const error = useSelector(addProjectError)
  const addNewProjectStatus = useSelector(addNewProjectStatusMsg)
  const updateProjectStatus = useSelector(updateProjectStatusMsg)
  const updateProjectError = useSelector(updateProjectErrorMsg)

  const projectForm = useRef(null)

  useEffect(() => {
    if (addNewProjectStatus) {
      addToast(addNewProjectStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      projectForm.current.reset()
      dispatch(clearProjectMsg())
      setPageView('projectListing')
    }
  }, [addNewProjectStatus, addToast])

  useEffect(() => {
    if (updateProjectStatus) {
      addToast(updateProjectStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      projectForm.current.reset()
      dispatch(clearProjectMsg())
      if (props) props.setUpdateAction()
    }
  }, [updateProjectStatus, addToast])

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: 'error', autoDismiss: true })
      dispatch(clearProjectMsg())
    }
  }, [error, addToast])

  useEffect(() => {
    if (updateProjectError) {
      addToast(updateProjectError, { appearance: 'error', autoDismiss: true })
      dispatch(clearProjectMsg())
    }
  }, [updateProjectError, addToast])

  const submitFormValues = values => {
    dispatch(
      projectToUpdate
        ? updateProject(values, projectToUpdate[0]._id)
        : addNewProject(values)
    )
  }

  let initialValues
  const {
    title,
    description,
    client,
    client_location,
    startdate = new Date(),
    enddate = new Date(),
    status = 'Active',
    technology,
    type
  } = projectToUpdate ? projectToUpdate[0] : {}

  initialValues = {
    title,
    description,
    client,
    client_location,
    startdate,
    enddate,
    status,
    technology,
    type
  }

  const handleProjectListView = () => {
    props.setUpdateAction()
  }

  const projectDataValidation = Yup.object().shape({
    title: yupRequired('Project Title')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    description: yupRequired('Description')
      .min(2, 'Too Short!')
      .max(150, 'Too Long!'),
    client: yupRequired('Client')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    client_location: yupRequired('Client Location'),
    type: yupRequired('Project Type')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    technology: yupRequired('Technology')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    startdate: yupRequiredDate('Start Date').typeError(''),
    enddate: yupRequiredDate('End Date')
      .typeError('')
      .test('', 'Must be greater than Start Date', function(value) {
        const startdate = this.parent.startdate
        return value >= startdate
      })
  })

  return (
    <GridContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          submitFormValues(values)
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
                    {projectToUpdate ? 'UPDATE PROJECT' : 'ADD PROJECT'}
                  </h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Project Title"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: values.title,
                          name: 'title',
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="title" />
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
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="description" />
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
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="client" />
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
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="client_location" />
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
                          required: false
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="technology" />
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
                          required: false
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="type" />
                      </div>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid
                          container
                          justify="flex-start"
                          style={{ paddingLeft: 11, paddingRight: 11 }}
                        >
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            name="startdate"
                            label="Start Date"
                            value={values.startdate}
                            onChange={date => setFieldValue('startdate', date)}
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                            fullWidth
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                      <div className={classes.error}>
                        <ErrorMessage name="startdate" />
                      </div>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid
                          container
                          justify="flex-start"
                          style={{ paddingLeft: 11, paddingRight: 11 }}
                        >
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            name="enddate"
                            label="End Date"
                            value={values.enddate}
                            onChange={date => setFieldValue('enddate', date)}
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                            fullWidth
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                      <div className={classes.error}>
                        <ErrorMessage name="enddate" />
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>

                <CardFooter>
                  {projectToUpdate ? (
                    <>
                      <GridItem xs={12} sm={12} md={6}>
                        <Button
                          id="update"
                          type="submit"
                          color="primary"
                          disabled={isSubmitting}
                        >
                          UPDATE PROJECT
                        </Button>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          onClick={handleProjectListView}
                        >
                          cancel
                        </Button>
                      </GridItem>
                    </>
                  ) : (
                    <Button
                      id="add"
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      ADD PROJECT
                    </Button>
                  )}
                </CardFooter>
              </Form>
            </Card>
          </GridItem>
        )}
      </Formik>
    </GridContainer>
  )
}
export default Project
