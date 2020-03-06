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
    // const classes = useStyles()    
    // const { currentUser } = useContext(UserContext)
    const dispatch = useDispatch()
    const [pageView, setPageView] = useState("employeeListing");
    const employeeData = useSelector(state => state.EmployeeInfo.employeeData)

    useEffect(() => {
        dispatch(loadAllEmployeeData());
        // dispatch(loadAllProjects());   remove not needed todo
    }, [dispatch])

    const handleAddUser = ()=>{
      setPageView('addNewuser');
    }

    const handlesearchUser = ()=>{
      setPageView('employeeListing');
    }

    return (
        <GridContainer>
          {/* <GridItem xs={6} sm={6} md={6}>
                <InputLabel className={classes.cardTitle}>
                    Welcome {currentUser ? currentUser.userName : null}
                </InputLabel>
            </GridItem> */}
            <GridItem style={{ textAlign: 'end' }} xs={12} sm={12} md={12}> 
            {pageView == "employeeListing" ?<Button type="submit" color="primary" onClick = {handleAddUser} > ADD EMPLOYEE </Button>           
            :  <Button type="submit" color="primary" onClick = {handlesearchUser} >  SEARCH EMPLOYEE   </Button>
}
            </GridItem>
           
          {pageView == "employeeListing" ?  ( <EmployeeListing          
          employeeData = {employeeData} 
          /> ) : (<Employee setPageView = {setPageView}/>)}
        </GridContainer>
    )
}
export default withAuth(Employees)
