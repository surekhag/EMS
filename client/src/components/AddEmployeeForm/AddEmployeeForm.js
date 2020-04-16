import React, { useEffect, useRef } from 'react'
import GridContainer from '../Grid/GridContainer'
import { useToasts } from 'react-toast-notifications'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import EmployeeForm from './subcomponents/EmployeeForm'
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
import { countryData } from '../../constants'
import {
  managerDataSelector,
  addNewUserSuccess,
  updateUserStatusSuccess,
  updateUserErrorMsg,
  addNewUserError
} from '../../selectors/employeeSelectors'

const AddEmployeeForm = props => {
  const { setPageView, userToUpdate, setUpdateAction } = props
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
  }, [dispatch])

  useEffect(() => {
    if (addNewUserStatus || updateUserStatus) {
      addToast(addNewUserStatus || updateUserStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      if (addNewUserStatus) setPageView(true)

      if (updateUserStatus) {
        setUpdateAction()
      }
      userForm.current.reset()
      dispatch(clearUserStatus())
    }
  }, [addNewUserStatus, updateUserStatus, addToast, dispatch])

  useEffect(() => {
    if (error || updateUserError) {
      addToast(error || updateUserError, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearUserStatus())
    }
  }, [error, updateUserError, addToast, dispatch])

  const getStates = value => {
    if (value === null) return []

    const states = countryData.filter(item => {
      if (item.country === value) {
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
    setUpdateAction()
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
        {formHandlerData => (
          <EmployeeForm
            formHandlerData={formHandlerData}
            handleSeachView={handleSeachView}
            getStates={getStates}
            managers={managerdata}
            userForm={userForm}
            userToUpdate={userToUpdate}
          />
        )}
      </Formik>
    </GridContainer>
  )
}
export default AddEmployeeForm
