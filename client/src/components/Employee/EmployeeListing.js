import Table from '../../components/Table/Table'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Search from '@material-ui/icons/Search'
import CustomInput from '../../components/CustomInput/CustomInput'
import Button from '../../components/CustomButtons/Button'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import GridItem from '../../components/Grid/GridItem'
// import DialogActions from '@material-ui/core/DialogActions';
import { Dialog, DialogActions } from '@material-ui/core'
import {
  deleteEmployee,
  clearDeleteEmployeeMsg
} from '../../actions/employeeAction'
import { useToasts } from 'react-toast-notifications'
import Employee from './Employee'
import { deleteEmployeeSuccessMsg, deleteEmployeeErrors } from '../../selectors/employeeSelectors'
const useStyles = makeStyles(styles)
const EmployeeListing = props => {
  const { employeeData, setPageView } = props
  const { addToast } = useToasts()
  const classes = useStyles()
  const [searchText, setsearchText] = useState('')
  const dispatch = useDispatch()
  const [userToUpdate, setUserToUpdate] = useState(null)
  const [updateAction, setUpdateAction] = useState(null)
  const [showDelDialog, setShowDelDialog] = useState(false)
  const deleteEmployeeSuccess = useSelector(deleteEmployeeSuccessMsg)
  const deleteEmployeeError = useSelector(deleteEmployeeErrors)

  const employeeListingHeader = [
    'Employee Id',
    'Name',
    'Designation',
    'Contact No.',
    'Email Address',
    'Reporting Manager'
  ]

  const changeHandler = e => {
    setsearchText(e.target.value)
  }

  // Clear Search text on Update Cancel/Success
  useEffect(() => {
    if (!updateAction) {
      setsearchText('')
    }
  }, [updateAction])

  useEffect(() => {
    if (deleteEmployeeSuccess) {
      addToast(deleteEmployeeSuccess, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(clearDeleteEmployeeMsg())
    }
  }, [deleteEmployeeSuccess, addToast, dispatch])

  useEffect(() => {
    if (deleteEmployeeError) {
      addToast(deleteEmployeeError, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearDeleteEmployeeMsg())
    }
  }, [deleteEmployeeError, addToast, dispatch])

  const employeeDetails = []
  let filteredEmployee
  if (employeeData && searchText) {
    filteredEmployee = employeeData.filter(
      cls =>
        cls.userName.toLowerCase().includes(searchText.toLowerCase().trim()) &&
        cls.status !== 'Inactive'
    )
    filteredEmployee.map((key, value) => {
      const {
        employee_id,
        firstname,
        lastname,
        contact_no,
        email,
        reporting_manager,
        designation
      } = key

      const manager = filteredEmployee.filter(item => {
        if (
          item.userRole == 'Manager' &&
          item.employee_id == reporting_manager
        ) {
          return item
        }
      })
      const managerName = manager[0]
        ? manager[0].firstname + ' ' + manager[0].lastname
        : 'NA'

      const name = firstname + ' ' + lastname
      const data = {
        employee_id,
        name,
        designation,
        contact_no,
        email,
        managerName
      }
      employeeDetails.push(Object.values(data))
      return ;
    })
  }

  const links = ['Update', 'Delete']

  const getUserToUpdate = (employeeData, employee_id) => {
    return employeeData.filter(item => {
      if (item.employee_id == employee_id) return item
    })
  }

  const updateUser = val => {
    setUpdateAction('update')
    const user = getUserToUpdate(filteredEmployee, val[0])
    setUserToUpdate(user)
  }

  const deleteUser = val => {
    const user = getUserToUpdate(filteredEmployee, val[0])
    setUpdateAction('delete')
    setUserToUpdate(user)
    setShowDelDialog(true)
  }

  const handleYesDelete = () => {
    dispatch(deleteEmployee(userToUpdate[0]._id))
    setShowDelDialog(false)
  }

  const handleNoDelete = () => {
    setShowDelDialog(false)
  }

  return (
    <>
      {updateAction == 'update' ? (
        <Employee
          setUpdateAction={setUpdateAction}
          userToUpdate={userToUpdate}
          setPageView={setPageView}
        />
      ) : (
        <>
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              formControlProps={{
                className: classes.margin + ' ' + classes.search
              }}
              inputProps={{
                onChange: changeHandler,
                placeholder: 'Search Employee',
                inputProps: {
                  'aria-label': 'Search'
                }
              }}
            />
            <Button color="white" aria-label="edit" justIcon round>
              <Search />
            </Button>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>Employee List</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="gray"
                  tableHead={
                    employeeData && employeeDetails.length > 0 && searchText
                      ? employeeListingHeader
                      : null
                  }
                  tableData={employeeDetails || null}
                  addLinks={links}
                  updateUser={updateUser}
                  deleteUser={deleteUser}
                  showLink={false}
                />
              </CardBody>
            </Card>
          </GridItem>
          <Dialog title="Delete Employee" modal={true} open={showDelDialog}>
            <DialogActions>
              <GridItem xs={12} sm={12} md={12}>
                <p> Are you sure you want to delete this Employee ? </p>
                <Button onClick={handleYesDelete}> Yes</Button>
                <Button onClick={handleNoDelete}> No</Button>
              </GridItem>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  )
}

export default EmployeeListing
