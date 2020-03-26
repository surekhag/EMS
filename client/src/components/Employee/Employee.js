import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'
import Button from '../../components/CustomButtons/Button'
import CustomInput from '../../components/CustomInput/CustomInput'
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
import SelectMenu from '../FromComponents/SelectMenu'
import DatePicker from '../../components/FromComponents/DatePicker'
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
                    {userToUpdate ? 'UPDATE EMPLOYEE' : 'ADD EMPLOYEE '}
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
                    {/* <GridItem xs={12} sm={12} md={4}>
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
                    </GridItem> */}
                    <GridItem xs={12} sm={12} md={4}>
                      <SelectMenu
                        className={classes.formControl}
                        name="country"
                        onChange={handleChange}
                        disabledName="None"
                        label="Country"
                        onBlur={e => {
                          setFieldValue('state', '')
                        }}
                        value={values.country}
                      >
                        {countryData.map(item => {
                          return (
                            <MenuItem value={item.country}>
                              {item.name}
                            </MenuItem>
                          )
                        })}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <SelectMenu
                        name="state"
                        onChange={handleChange}
                        disabledName="None"
                        label="State"
                        value={values.state}
                      >
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
                      </SelectMenu>
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
                    </GridItem>
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
                      <DatePicker
                        name="dateofbirth"
                        value={values.dateofbirth}
                        label="Date Of Birth"
                        onChange={date => setFieldValue('dateofbirth', date)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <DatePicker
                        name="dateofjoining"
                        value={values.dateofjoining}
                        label="Date Of Joining"
                        onChange={date => setFieldValue('dateofjoining', date)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="gender"
                        onChange={handleChange}
                        disabledName="None"
                        label="Gender"
                        value={values.gender}
                      >
                        {gender.map(item => {
                          return <MenuItem value={item}>{item}</MenuItem>
                        })}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="work_location"
                        onChange={handleChange}
                        disabledName="None"
                        label="Work Location"
                        value={values.work_location}
                      >
                        {work_location.map(item => {
                          return (
                            <MenuItem value={item.id}>{item.location}</MenuItem>
                          )
                        })}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="timezone"
                        onChange={handleChange}
                        disabledName="None"
                        label="Timezone"
                        value={values.timezone}
                      >
                        {work_location.map(item => {
                          return (
                            <MenuItem value={item.id}>{item.location}</MenuItem>
                          )
                        })}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="shift_timing"
                        onChange={handleChange}
                        disabledName="None"
                        label="Shift Timing"
                        value={values.shift_timing}
                      >
                        {shift_timing.map(item => {
                          return <MenuItem value={item}>{item}</MenuItem>
                        })}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="designation"
                        onChange={handleChange}
                        disabledName="None"
                        label="Designation"
                        value={values.designation}
                      >
                        {designation.map(item => {
                          return <MenuItem value={item}>{item}</MenuItem>
                        })}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="employment_status"
                        onChange={handleChange}
                        disabledName="None"
                        label="Employment Status"
                        value={values.employment_status}
                      >
                        {employment_status.map(item => {
                          return <MenuItem value={item}>{item}</MenuItem>
                        })}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="userRole"
                        onChange={handleChange}
                        disabledName="None"
                        label="User Role"
                        value={values.userRole}
                      >
                        {userRole.map(item => {
                          return <MenuItem value={item}>{item}</MenuItem>
                        })}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="reporting_manager"
                        onChange={handleChange}
                        disabledName="None"
                        label="Reporting Manager"
                        value={values.reporting_manager}
                      >
                        {managers
                          ? managers.map(item => {
                              return (
                                <MenuItem value={item.employee_id}>
                                  {item.firstname + ' ' + item.lastname}
                                </MenuItem>
                              )
                            })
                          : null}
                      </SelectMenu>
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
