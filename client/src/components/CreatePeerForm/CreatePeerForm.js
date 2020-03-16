import React, { useEffect, useState } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { withToastManager, useToasts } from 'react-toast-notifications'

import DateFnsUtils from '@date-io/date-fns'
import { loadAllProjects } from '../../actions/projectAction'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import withAuth from '../../HOC/withAuth'
import {
  createPeerReview,
  setPeerReviewSuccess,
  updatePeerReview
} from '../../actions/peerReviewAction'
import { loadAllEmployeeData } from '../../actions/employeeAction'

// core components
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js'
import Grid from '@material-ui/core/Grid'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import { useSelector, useDispatch } from 'react-redux'

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
  container: {
    marginTop: '27px'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'right',
    paddingRight: '30px',
    textTransform: 'uppercase'
  },
  footerDisplay: {
    justifyContent: 'space-evenly'
  },
  formControl: {
    margin: '11px 0',
    minWidth: '100%'
  },
  marginTop: {
    margin: '0px'
  },
  widthSetting: {
    width: '100%'
  },
  colorRed: {
    color: 'red'
  },
  hoverEffect: {
    '&:focus': {
      backgroundColor: '#004de6',
      color: 'white'
    },
    '&:hover': {
      backgroundColor: '#004de6',
      color: 'white',
      opacity: '0.5'
    }
  }
}

const useStyles = makeStyles(styles)

const CreatePeerForm = ({ updateInfo, ClickHandler }) => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const [managers, setManagers] = useState()
  const employeeData = useSelector(state => state.EmployeeInfo.employeeData)
  const projects = useSelector(state => state.projectReducer.projects)
  let initialValues
  console.log('update', updateInfo)
  if (updateInfo) {
    initialValues = {
      employee_under_review: updateInfo.employee_under_review,
      employee_reviewing: updateInfo.employee_reviewing,
      project: updateInfo.project,
      functional_manager: updateInfo.functional_manager,
      from_date: updateInfo.from_date,
      to_date: updateInfo.to_date,
      due_from: updateInfo.due_from,
      due_to: updateInfo.due_to,
      review_form_link: updateInfo.review_form_link
    }
  } else {
    initialValues = {
      employee_under_review: '',
      employee_reviewing: '',
      project: '',
      functional_manager: '',
      from_date: new Date(),
      to_date: new Date(),
      due_from: new Date(),
      due_to: new Date(),
      review_form_link: ''
    }
  }

  const peerReviewStatusMessage = useSelector(
    state => state.peerReviewReducer.peerReviewMessage
  )
  const peerReviewUpdateStatus = useSelector(
    state => state.peerReviewReducer.peerReviewUpdateStatus
  )
  const peerReviewUpdateError = useSelector(
    state => state.peerReviewReducer.peerReviewUpdateError
  )
  const dispatch = useDispatch()
  const validationSchema = {
    employee_under_review: Yup.string().required('Required'),
    review_form_link: Yup.string().required('Required'),
    employee_reviewing: Yup.string()
      .notOneOf(
        [Yup.ref('employee_under_review'), null],
        'Employee under review must not equal to Employee reviewing'
      )
      .required('Required'),
    from_date: Yup.date('Invalid date').required('required'),
    to_date: Yup.date('Invalid date')
      .test('', 'Must be greater than from date', function(value) {
        const from_date = this.parent.from_date
        return value > from_date
      })
      .required('required'),
    due_from: Yup.date('Invalid date').required('required'),
    due_to: Yup.date('Invalid date')
      .test('', 'Must be greater than due from date', function(value) {
        const due_from = this.parent.due_from
        return value > due_from
      })
      .required('required'),
    project: Yup.string().required('Required'),
    functional_manager: Yup.string().required('Required')
  }
  useEffect(() => {
    if (employeeData) {
      const emp = employeeData
      const managers = emp.filter(item => {
        if (item.userRole == 'Manager' && item.status == 'Active') return item
      })
      setManagers(managers)
    }
  }, [employeeData])
  useEffect(() => {
    dispatch(loadAllProjects())
    dispatch(loadAllEmployeeData())
  }, [dispatch])
  useEffect(() => {
    if (peerReviewStatusMessage) {
      if (peerReviewStatusMessage.status === 200) {
        addToast('Peer Review successfully added', {
          appearance: 'success',
          autoDismiss: true
        })
      } else {
        addToast('Error while saving form', {
          appearance: 'error',
          autoDismiss: true
        })
      }
    } else if (peerReviewUpdateStatus) {
      if (peerReviewUpdateStatus.status === 200) {
        addToast('Peer Review successfully updated', {
          appearance: 'success',
          autoDismiss: true
        })
      } else {
        addToast('Error while saving form', {
          appearance: 'error',
          autoDismiss: true
        })
      }
    } else if (peerReviewUpdateError) {
      addToast('Error while saving form', {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }, [
    peerReviewStatusMessage,
    peerReviewUpdateStatus,
    peerReviewUpdateError,
    addToast,
    dispatch
  ])
  const submitReview = values => {
    if (updateInfo) {
      dispatch(updatePeerReview(updateInfo._id, values))
    } else {
      dispatch(createPeerReview(values))
    }
  }
  return (
    <Grid>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          submitReview(values)
          setSubmitting(false)
        }}
        validationSchema={Yup.object(validationSchema)}
      >
        {({ isSubmitting, values, setFieldValue, handleChange }) => (
          <Card>
            <Form>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>CREATE PEER FORM</h4>
              </CardHeader>
              <CardBody>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Employee Under Review
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <FormControl className={classes.formControl}>
                      <Select
                        name="employee_under_review"
                        onChange={handleChange}
                        value={values.employee_under_review}
                        displayEmpty
                      >
                        <MenuItem
                          className={classes.hoverEffect}
                          value=""
                          key={-1}
                          disabled
                        >
                          Select Employee
                        </MenuItem>
                        {employeeData
                          ? employeeData.map((prop, key) => {
                              return prop.status !== 'Inactive' ? (
                                <MenuItem
                                  className={classes.hoverEffect}
                                  value={prop.userName}
                                  key={key}
                                >
                                  {prop.userName}
                                </MenuItem>
                              ) : null
                            })
                          : null}
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      className={classes.colorRed}
                      name="employee_under_review"
                      component="div"
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Employee Reviewing
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <FormControl className={classes.formControl}>
                      <Select
                        name="employee_reviewing"
                        onChange={handleChange}
                        value={values.employee_reviewing}
                        displayEmpty
                      >
                        <MenuItem
                          className={classes.hoverEffect}
                          value=""
                          key={-1}
                          disabled
                        >
                          Select Employee
                        </MenuItem>
                        {employeeData
                          ? employeeData.map((prop, key) => {
                              return prop.status !== 'Inactive' ? (
                                <MenuItem
                                  className={classes.hoverEffect}
                                  value={prop.userName}
                                  key={key}
                                >
                                  {prop.userName}
                                </MenuItem>
                              ) : null
                            })
                          : null}
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      className={classes.colorRed}
                      name="employee_reviewing"
                      component="div"
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Project
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <FormControl className={classes.formControl}>
                      <Select
                        name="project"
                        onChange={handleChange}
                        value={values.project}
                        displayEmpty
                      >
                        <MenuItem
                          className={classes.hoverEffect}
                          value=""
                          key={-1}
                          disabled
                        >
                          Select Project
                        </MenuItem>
                        {projects
                          ? projects.map((prop, key) => {
                              return (
                                <MenuItem
                                  className={classes.hoverEffect}
                                  value={prop.title}
                                  key={key}
                                >
                                  {prop.title}
                                </MenuItem>
                              )
                            })
                          : null}
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      className={classes.colorRed}
                      name="project"
                      component="div"
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Functional Manager
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <FormControl className={classes.formControl}>
                      <Select
                        name="functional_manager"
                        onChange={handleChange}
                        value={values.functional_manager}
                        displayEmpty
                      >
                        <MenuItem
                          className={classes.hoverEffect}
                          value=""
                          key={-1}
                          disabled
                        >
                          Select Manager
                        </MenuItem>
                        {managers
                          ? managers.map(item => {
                              return (
                                <MenuItem
                                  value={item.firstname + ' ' + item.lastname}
                                  className={classes.hoverEffect}
                                >
                                  {item.firstname + ' ' + item.lastname}
                                </MenuItem>
                              )
                            })
                          : null}
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      className={classes.colorRed}
                      name="functional_manager"
                      component="div"
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Review From Date
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid xs={6} sm={6} md={3} item>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        name="from_date"
                        margin="normal"
                        className={classes.widthSetting}
                        value={values.from_date}
                        onChange={date => setFieldValue('from_date', date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                      <ErrorMessage
                        className={classes.colorRed}
                        name="from_date"
                        component="div"
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Review To Date
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid xs={6} sm={6} md={3} item>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        name="to_date"
                        format="MM/dd/yyyy"
                        className={classes.widthSetting}
                        margin="normal"
                        value={values.to_date}
                        onChange={date => setFieldValue('to_date', date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                      <ErrorMessage
                        className={classes.colorRed}
                        name="to_date"
                        component="div"
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Due From Date
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid xs={6} sm={6} md={3} item>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        name="due_from"
                        format="MM/dd/yyyy"
                        margin="normal"
                        className={classes.widthSetting}
                        value={values.due_from}
                        onChange={date => setFieldValue('due_from', date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                      <ErrorMessage
                        className={classes.colorRed}
                        name="due_from"
                        component="div"
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Due To Date
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid xs={6} sm={6} md={3} item>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        name="due_to"
                        format="MM/dd/yyyy"
                        margin="normal"
                        className={classes.widthSetting}
                        value={values.due_to}
                        onChange={date => setFieldValue('due_to', date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                      <ErrorMessage
                        className={classes.colorRed}
                        name="due_to"
                        component="div"
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Google Form Link
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <CustomInput
                      labelText="Link"
                      id="review_form_link"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.marginTop
                      }}
                      inputProps={{
                        value: values.review_form_link,
                        name: 'review_form_link',
                        onChange: handleChange
                        // required: true
                      }}
                    ></CustomInput>
                    <ErrorMessage
                      className={classes.colorRed}
                      name="review_form_link"
                      component="div"
                    />
                  </Grid>
                </Grid>
              </CardBody>
              <CardFooter className={classes.footerDisplay}>
                {updateInfo ? (
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    UPDATE PEER
                  </Button>
                ) : (
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    CREATE PEER
                  </Button>
                )}
                <Button type="submit" color="primary" onClick={ClickHandler}>
                  Close
                </Button>
              </CardFooter>
            </Form>
          </Card>
        )}
      </Formik>
    </Grid>
  )
}
const peerReviewFormWithHOC = compose(
  withToastManager,
  withAuth
)(CreatePeerForm)
export default peerReviewFormWithHOC
