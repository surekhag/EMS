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
import { useToasts } from 'react-toast-notifications'
import { employeeStyles } from './Styles'
import MenuItem from '@material-ui/core/MenuItem'
import { Formik, Form, ErrorMessage } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import SelectMenu from '../FromComponents/SelectMenu'
import Input from '../FromComponents/Input'
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
import { loadManagers } from '../../actions/employeeAction'
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
  managerDataSelector,
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
  const error = useSelector(addNewUserError)
  const addNewUserStatus = useSelector(addNewUserSuccess)
  const updateUserStatus = useSelector(updateUserStatusSuccess)
  const updateUserError = useSelector(updateUserErrorMsg)
  const managerdata = useSelector(managerDataSelector)
  const userForm = useRef(null)

  // Load all emp info
  useEffect(() => {
    dispatch(loadManagers())
  }, [])

  useEffect(() => {
    if (managerdata) {
      const emp = managerdata
      const managers = emp.filter(item => {
        if (item.userRole === 'Manager' && item.status === 'Active') return item
      })
      setManagers(managers)
    }
  }, [managerdata])

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
    userToUpdate
      ? dispatch(updateUser(values, userToUpdate[0]._id))
      : dispatch(addNewUser(values))
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
                          <Input
                            name="employee_id"
                            value={values.employee_id}
                            onChange={handleChange}
                            labelText="Employee Id * "
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <Input
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            labelText="Email Address *"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <Input
                            name="userName"
                            value={values.userName}
                            onChange={handleChange}
                            labelText="UserName *"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <Input
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            labelText="Password *"
                            type="password"
                          />
                        </GridItem>
                      </>
                    )}
                    <GridItem xs={12} sm={12} md={4}>
                      <Input
                        name="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                        labelText="Firstname *"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Input
                        name="middlename"
                        value={values.middlename}
                        onChange={handleChange}
                        labelText="Middlename"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Input
                        name="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        labelText="Lastname *"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Input
                        name="address1"
                        value={values.address1}
                        onChange={handleChange}
                        labelText="Address 1 *"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Input
                        name="address2"
                        value={values.address2}
                        onChange={handleChange}
                        labelText="Address 2"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <SelectMenu
                        className={classes.formControl}
                        name="country"
                        onChange={handleChange}
                        disabledName="None"
                        label="Country *"
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
                        label="State *"
                        value={values.state}
                      >
                        {countryData.map(item => {
                          if (
                            values.country &&
                            item.country === values.country
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
                      <Input
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        labelText="City *"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Input
                        name="zip"
                        value={values.zip}
                        onChange={handleChange}
                        labelText="Zip *"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Input
                        name="contact_no"
                        value={values.contact_no}
                        onChange={handleChange}
                        labelText="Conatct Number *"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Input
                        name="experience_at_joining"
                        value={values.experience_at_joining}
                        onChange={handleChange}
                        labelText="Experience At Joining *"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <DatePicker
                        name="dateofbirth"
                        value={values.dateofbirth}
                        label="Date Of Birth *"
                        onChange={date => setFieldValue('dateofbirth', date)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <DatePicker
                        name="dateofjoining"
                        value={values.dateofjoining}
                        label="Date Of Joining *"
                        onChange={date => setFieldValue('dateofjoining', date)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="gender"
                        onChange={handleChange}
                        disabledName="None"
                        label="Gender *"
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
                        label="Work Location *"
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
                        label="Timezone *"
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
                        label="Shift Timing *"
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
                        label="Designation *"
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
                        label="Employment Status *"
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
                        label="User Role *"
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
                        label={
                          values.designation === 'Partner' ||
                          values.designation === 'Chief Executive Officer'
                            ? 'Reporting Manager'
                            : 'Reporting Manager *'
                        }
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
                      <Input
                        name="skills"
                        value={values.skills}
                        onChange={handleChange}
                        labelText="Skills *"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Input
                        name="certifications"
                        value={values.certifications}
                        onChange={handleChange}
                        labelText="Certifications"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <Input
                        name="achievements"
                        value={values.achievements}
                        onChange={handleChange}
                        labelText="Achievements"
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
