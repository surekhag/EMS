import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllEmployeeData } from '../../actions/employeeAction.js'
import {loadAllProjects} from '../../actions/projectAction'
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import Button from '../../components/CustomButtons/Button'
import InputLabel from '@material-ui/core/InputLabel'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import EmployeeListing from '../../components/Employee/EmployeeListing'
import Employee from '../../components/Employee/Employee'
import withAuth from '../../HOC/withAuth'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { UserContext } from '../../context-provider/user-context'

const useStyles = makeStyles(styles)

const Employees = props => {
    const classes = useStyles()
    const [searchText, setsearchText] = useState('')
    const { currentUser } = useContext(UserContext)
    const dispatch = useDispatch()
    const [pageView, setPageView] = useState("employeeListing");

    const employeeData = useSelector(state => state.EmployeeInfo.employeeData)

    useEffect(() => {
        dispatch(loadAllEmployeeData());
        dispatch(loadAllProjects());  
    }, [dispatch])


    const employeeListingHeader = [
      'Id',
      'Employee Id',
      "UserName",
      'Name',
      "Designation",
      'Functional Manager',
      'Reporting Manager'
    ]


    let employeeDetails = []
    if (employeeData) {
        let filteredEmployee = employeeData.data.data.filter(
            cls =>
                cls.userName
                    .toLowerCase()
                    .includes(searchText.toLowerCase().trim()) &&
                cls.status !== 'Inactive'
        )
        filteredEmployee.map((key, value) => {         
          const {_id, userName, employee_id, firstname, lastname, functional_manager, reporting_manager, designation} =key
          const name =firstname+ " "+ lastname;
          const data ={_id, employee_id, userName,name , designation, functional_manager, reporting_manager}        
            employeeDetails.push(Object.values(data))
            return 1
        })      
    }
  
    const changeHandler = e => {
        setsearchText(e.target.value)        
    }
const handleAddUser = ()=>{
  console.log("add new user");
  setPageView('addNewuser');
}
    return (
        <GridContainer>
          <GridItem xs={6} sm={6} md={6}>
                <InputLabel className={classes.cardTitle}>
                    Welcome {currentUser ? currentUser.userName : null}
                </InputLabel>
            </GridItem>
            <GridItem style={{ textAlign: 'end' }} xs={6} sm={6} md={6}>              
            <Button type="submit" color="primary" onClick = {handleAddUser} >
                  ADD EMPLOYEE
            </Button>
            </GridItem>
           
          {pageView == "employeeListing" ?  ( <EmployeeListing 
          changeHandler = {changeHandler}          
          employeeData = {employeeData} 
          employeeDetails = {employeeDetails} 
          classes = {classes} 
          header={employeeListingHeader}
          searchText = {searchText} /> ) : (<Employee />)}

        </GridContainer>
    )
}
export default withAuth (Employees)
