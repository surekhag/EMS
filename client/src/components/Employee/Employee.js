import React, { useState, useEffect, useRef } from 'react'
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
import DateFnsUtils from '@date-io/date-fns'
import InputLabel from '@material-ui/core/InputLabel'
import { useToasts } from 'react-toast-notifications'
import Grid from '@material-ui/core/Grid'
import { employeeStyles } from './Styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import { Formik, Form, ErrorMessage } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import {
  formikInitialValues,
  formikInitialValuesAddUser,
  formikAddNewUserValidations,
  formikUpdateValidations
} from './EmployeeFormValues'
import {
  addNewUser,
  clearUserStatus,
  updateUser
} from '../../actions/userActions'
import { loadAllEmployeeData } from '../../actions/employeeAction'
import {
  gender,
  work_location,
  shift_timing,
  designation,
  employment_status,
  userRole,
  countryData
} from '../../constants'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import {
  employeeDataSelector,
  addNewUserSuccess,
  updateUserStatusSuccess,
  updateUserErrorMsg,
  addNewUserError
} from '../../selectors/employeeSelectors'

const styles = employeeStyles
const useStyles = makeStyles(styles)
const Employee = props => {
  const [managers, setManagers] = useState()
  const { setPageView, userToUpdate } = props
  const classes = useStyles()
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const employeeData = useSelector(employeeDataSelector)
  const error = useSelector(addNewUserError)
  const addNewUserStatus = useSelector(addNewUserSuccess)
  const updateUserStatus = useSelector(updateUserStatusSuccess)
  const updateUserError = useSelector(updateUserErrorMsg)
  const userForm = useRef(null)

  // Load all emp info
  useEffect(() => {
    dispatch(loadAllEmployeeData())
  }, [])

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
    if (addNewUserStatus || updateUserStatus) {
      addToast(addNewUserStatus ? addNewUserStatus : updateUserStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      if (addNewUserStatus) setPageView('employeeListing')

      if (updateUserStatus) {
        if (props) props.setUpdateAction()
      }
      userForm.current.reset()
      dispatch(clearUserStatus())
    }
  }, [addNewUserStatus, updateUserStatus, addToast])

  useEffect(() => {
    if (error || updateUserError) {
      addToast(error ? error : updateUserError, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearUserStatus())
    }
  }, [error, updateUserError, addToast])

  const getStates = value => {
    if (value === null) return []

    const states = countryData.filter(item => {
      if (item.country == value) {
        return item
      }
    })
    return states.length > 0 ? states[0].states : []
  }
  const submitFormValues = values => {
    if (userToUpdate) {
      const id = userToUpdate[0]._id
      dispatch(updateUser(values, id))
    } else {
      dispatch(addNewUser(values))
    }
  }

  let initialValues
  const initialValuesAddUser = formikInitialValuesAddUser
  initialValues = formikInitialValues(userToUpdate)

  if (userToUpdate) {
    initialValues = initialValues
  } else {
    initialValues = { ...initialValues, ...initialValuesAddUser }
  }

  const handleSeachView = () => {
    props.setUpdateAction()
  }

  let userDataValidation
  const addNewUserValidations = formikAddNewUserValidations
  const updateValidations = formikUpdateValidations

  if (userToUpdate) {
    userDataValidation = updateValidations
  } else {
    userDataValidation = updateValidations.concat(addNewUserValidations)
  }

  return (
    <GridContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          submitFormValues(values)
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
                    {userToUpdate ? 'UPDATE EMPLOYEE' : 'ADD EMPLOYEE '}{' '}
                  </h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    {userToUpdate ? null : (
                      <>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Employee Id"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              value: values.employee_id,
                              name: 'employee_id',
                              onChange: handleChange
                            }}
                          />
                          <div className={classes.error}>
                            <ErrorMessage name="employee_id" />
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
                              name: 'email',
                              onChange: handleChange
                            }}
                          />
                          <div className={classes.error}>
                            <ErrorMessage name="email" />
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
                              onChange: handleChange
                            }}
                          />
                          <div className={classes.error}>
                            <ErrorMessage name="userName" />
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Password"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: 'password',
                              value: values.password,
                              name: 'password',
                              onChange: handleChange
                            }}
                          />
                          <div className={classes.error}>
                            <ErrorMessage name="password" />
                          </div>
                        </GridItem>
                      </>
                    )}
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Firstname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: values.firstname,
                          name: 'firstname',
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="firstname" />
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
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="middlename" />
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
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="lastname" />
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
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="address1" />
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
                          required: false
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="country"> Country</InputLabel>
                        <Select
                          value={values.country}
                          onChange={handleChange}
                          onBlur={e => {
                            setFieldValue('state', '')
                          }}
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
                      <div className={classes.error}>
                        <ErrorMessage name="country" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="state">State</InputLabel>
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
                            if (
                              values.country &&
                              item.country == values.country
                            ) {
                              return getStates(values.country).map(item => {
                                if (item) {
                                  return (
                                    <MenuItem value={item.code}>
                                      {item.name}
                                    </MenuItem>
                                  )
                                }
                              })
                            }
                          })}
                        </Select>
                      </FormControl>
                      <div className={classes.error}>
                        <ErrorMessage name="state" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}></GridItem>
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
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="city" />
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
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="zip" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Conatct Number"
                        name="contact_no"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: values.contact_no,
                          name: 'contact_no',
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="contact_no" />
                      </div>
                    </GridItem>{' '}
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Experience At Joining"
                        name="experience_at_joining"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: values.experience_at_joining,
                          name: 'experience_at_joining',
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="experience_at_joining" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
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
                            name="dateofbirth"
                            label="Date Of Birth"
                            value={values.dateofbirth}
                            onChange={date =>
                              setFieldValue('dateofbirth', date)
                            }
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                            fullWidth
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                      <div className={classes.error}>
                        <ErrorMessage name="dateofbirth" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
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
                            name="dateofjoining"
                            label="Date Of Joining"
                            value={values.dateofjoining}
                            onChange={date =>
                              setFieldValue('dateofjoining', date)
                            }
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                            fullWidth
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                      <div className={classes.error}>
                        <ErrorMessage name="dateofjoining" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="gender"> Gender</InputLabel>
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
                            return <MenuItem value={item}>{item}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                      <div className={classes.error}>
                        <ErrorMessage name="gender" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl className={classes.formControl}>
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
                      <div className={classes.error}>
                        <ErrorMessage name="work_location" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="timezone"> Timezone</InputLabel>
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
                      <div className={classes.error}>
                        <ErrorMessage name="timezone" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl className={classes.formControl}>
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
                            return <MenuItem value={item}>{item}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                      <div className={classes.error}>
                        <ErrorMessage name="shift_timing" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl className={classes.formControl}>
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
                            return <MenuItem value={item}>{item}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                      <div className={classes.error}>
                        <ErrorMessage name="designation" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl className={classes.formControl}>
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
                            return <MenuItem value={item}>{item}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                      <div className={classes.error}>
                        <ErrorMessage name="employment_status" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="userRole"> User Role</InputLabel>
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
                            return <MenuItem value={item}>{item}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                      <div className={classes.error}>
                        <ErrorMessage name="userRole" />
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl className={classes.formControl}>
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
                          {managers
                            ? managers.map(item => {
                                return (
                                  <MenuItem value={item.employee_id}>
                                    {item.firstname + ' ' + item.lastname}
                                  </MenuItem>
                                )
                              })
                            : null}
                        </Select>
                      </FormControl>
                      <div className={classes.error}>
                        <ErrorMessage name="reporting_manager" />
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
                          onChange: handleChange
                        }}
                      />
                      <div className={classes.error}>
                        <ErrorMessage name="skills" />
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
                          required: false
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Achievements"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: values.achievements,
                          name: 'achievements',
                          onChange: handleChange,
                          required: false
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>

                <CardFooter>
                  {userToUpdate ? (
                    <>
                      <GridItem xs={12} sm={12} md={6}>
                        <Button
                          id="update"
                          type="submit"
                          color="primary"
                          disabled={isSubmitting}
                        >
                          UPDATE EMPLOYEE
                        </Button>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          onClick={handleSeachView}
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
                      ADD EMPLOYEE
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
export default Employee
