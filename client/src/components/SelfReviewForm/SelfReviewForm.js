import React, { useEffect } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { withToastManager, useToasts } from 'react-toast-notifications'
import { loadAllProjects } from '../../actions/projectAction'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import withAuth from '../../HOC/withAuth'
import { createSelfReview, setSelfReviewSuccess, setSelfReviewError, updateSelfReview, setUpdateReviewStatus, setUpdateReviewError } from '../../actions/selfReviewActions'
import { loadAllEmployeeData, loadManagers } from '../../actions/employeeAction'
// core components
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle'
import createPeerFormStyle from '../../assets/jss/material-dashboard-react/components/createPeerFormStyle'
import Grid from '@material-ui/core/Grid'
import CustomInput from '../CustomInput/CustomInput'
import Button from '../CustomButtons/Button'
import DatePicker from '../FromComponents/DatePicker'
import SelectMenu from '../FromComponents/SelectMenu'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import MenuItem from '@material-ui/core/MenuItem'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import validationSchema from './validationSchema'
import { useSelector, useDispatch } from 'react-redux'
import {
  employeeDataSelector,
  managerDataSelector
} from '../../selectors/employeeSelectors'
import { projectSelector } from '../../selectors/projectSelectors'
import {
  selfReviewCreateSuccessSelector,
  selfReviewCreateErrorSelector,
  selfReviewUpdateSelector,
  selfReviewUpdateErrorSelector
} from '../../selectors/reviewSelectors'
const styles = {
  ...checkboxAdnRadioStyle,
  ...createPeerFormStyle
}

const useStyles = makeStyles(styles)

const SelfReviewForm = ({ selfReviewInfo, clickHandler }) => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const {
    employee,
    projects,
    functional_manager,
    from_date,
    to_date,
    due_from,
    due_to,
    review_form_link
  } = selfReviewInfo || {}
  const initialValues = selfReviewInfo => {
    return {
      employee: selfReviewInfo ? employee._id : '',
      projects: selfReviewInfo ? projects.map(({ _id }) => _id) : [],
      functional_manager: selfReviewInfo ? functional_manager._id : '',
      from_date: selfReviewInfo ? from_date : new Date(),
      to_date: selfReviewInfo ? to_date : new Date(),
      due_from: selfReviewInfo ? due_from : new Date(),
      due_to: selfReviewInfo ? due_to : new Date(),
      review_form_link: selfReviewInfo ? review_form_link : ''
    }
  }
  const employeeData = useSelector(employeeDataSelector)
  const managers = useSelector(managerDataSelector)
  const projectsData = useSelector(projectSelector)
  const selfReviewSuccessMessage = useSelector(selfReviewCreateSuccessSelector)
  const selfReviewErrorMessage = useSelector(selfReviewCreateErrorSelector)
  const selfReviewUpdateStatus = useSelector(selfReviewUpdateSelector)
  const selfReviewUpdateError = useSelector(selfReviewUpdateErrorSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadAllProjects())
    dispatch(loadAllEmployeeData())
    dispatch(loadManagers())
  }, [dispatch])
  useEffect(() => {
    if (selfReviewSuccessMessage) {
      addToast('Self Review successfully added', {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(setSelfReviewSuccess(''))
      clickHandler()
    }
  }, [selfReviewSuccessMessage, addToast, dispatch, clickHandler])

  useEffect(() => {
    if (selfReviewErrorMessage) {
      addToast('Error while saving form', {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(setSelfReviewError(''))
    }
  }, [selfReviewErrorMessage, addToast, dispatch, clickHandler])

  useEffect(() => {
    if (selfReviewUpdateStatus) {
      addToast('Self Review successfully updated', {
        appearance: 'success',
        autoDismiss: true
      })
      clickHandler()
      dispatch(setUpdateReviewStatus(''))
    }
  }, [selfReviewUpdateStatus, addToast, dispatch, clickHandler])

  useEffect(() => {
    if (selfReviewUpdateError) {
      addToast('Error while saving form', {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(setUpdateReviewError(''))
    }
  }, [selfReviewUpdateError, addToast, dispatch])
  const submitReview = values => {
    if (selfReviewInfo) {
      dispatch(updateSelfReview(selfReviewInfo._id, values))
    } else {
      dispatch(createSelfReview(values))
    }
  }
  return (
    <Grid>
      <Formik
        initialValues={initialValues(selfReviewInfo)}
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
                <h4 className={classes.cardTitleWhite}>CREATE SELF REVIEW FORM</h4>
              </CardHeader>
              <CardBody>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Employee *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <SelectMenu
                      name="employee"
                      onChange={handleChange}
                      disabledName="Select Employee"
                      value={values.employee}
                    >
                      {employeeData
                        ? employeeData.map((prop, key) => {
                          return prop.status !== 'Inactive' ? (
                            <MenuItem
                              className={classes.hoverEffect}
                              value={prop._id}
                              key={key}
                            >
                              {prop.firstname} {prop.lastname}
                            </MenuItem>
                          ) : null
                        })
                        : null}
                    </SelectMenu>
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Projects *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <SelectMenu
                      name="projects"
                      onChange={handleChange}
                      disabledName="Select Project"
                      value={values.projects}
                      multiple
                    >
                      {projectsData
                        ? projectsData.map((prop, key) => {
                          return (
                            <MenuItem
                              className={classes.hoverEffect}
                              value={prop._id}
                              key={key}
                            >
                              {prop.title}
                            </MenuItem>
                          )
                        })
                        : null}
                    </SelectMenu>
                  </Grid>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Functional Manager *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <SelectMenu
                      name="functional_manager"
                      onChange={handleChange}
                      disabledName="Select Manager"
                      value={values.functional_manager}
                    >
                      {managers
                        ? managers.map(item => {
                          return (
                            <MenuItem
                              value={item._id}
                              className={classes.hoverEffect}
                            >
                              {item.firstname + ' ' + item.lastname}
                            </MenuItem>
                          )
                        })
                        : null}
                    </SelectMenu>
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Google Form Link *
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
                      }}
                    ></CustomInput>
                    <ErrorMessage
                      className={classes.colorRed}
                      name="review_form_link"
                      component="div"
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Review From Date *
                  </Grid>
                  <Grid xs={6} sm={6} md={3}>
                    <DatePicker
                      name="from_date"
                      value={values.from_date}
                      onChange={date => setFieldValue('from_date', date)}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Review To Date *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <DatePicker
                      name="to_date"
                      value={values.to_date}
                      onChange={date => setFieldValue('to_date', date)}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.container} container>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Due From Date *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <DatePicker
                      name="due_from"
                      value={values.due_from}
                      onChange={date => setFieldValue('due_from', date)}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={3} className={classes.grid} item>
                    Due To Date *
                  </Grid>
                  <Grid xs={6} sm={6} md={3} item>
                    <DatePicker
                      name="due_to"
                      value={values.due_to}
                      onChange={date => setFieldValue('due_to', date)}
                    />
                  </Grid>
                </Grid>
              </CardBody>
              <CardFooter className={classes.footerDisplay}>
                {selfReviewInfo ? (
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    UPDATE SELF REVIEW
                  </Button>
                ) : (
                    <Button type="submit" color="primary" disabled={isSubmitting}>
                      CREATE SELF REVIEW
                    </Button>
                  )}
                <Button type="submit" color="white" onClick={clickHandler}>
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
const selfReviewFormWithHOC = compose(
  withToastManager,
  withAuth
)(SelfReviewForm)
export default selfReviewFormWithHOC
