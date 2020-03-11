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
import EmployeeListing from '../../components/Project/ProjectListing'
import Employee from '../../components/Project/Project'
import withAuth from '../../HOC/withAuth'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { UserContext } from '../../context-provider/user-context'

const useStyles = makeStyles(styles)

const Projects = props => {
    const dispatch = useDispatch()
    const [pageView, setPageView] = useState("employeeListing");
    const projectData = useSelector(state => state.projectReducer.projects)

    useEffect(() => {
        dispatch(loadAllProjects());
    }, [dispatch])

    const handleAddUser = ()=>{
      setPageView('addNewuser');
    }

    const handlesearchUser = ()=>{
      setPageView('employeeListing');
    }

    return (
        <GridContainer>
            <GridItem style={{ textAlign: 'end' }} xs={12} sm={12} md={12}> 
            {pageView == "employeeListing" ?<Button type="submit" color="primary" onClick = {handleAddUser} > ADD PROJECT </Button>           
            :  <Button type="submit" color="primary" onClick = {handlesearchUser} >  Back To Projects   </Button>
}
            </GridItem>
           
          {pageView == "employeeListing" ?  ( <EmployeeListing          
          projectData = {projectData } setPageView = {setPageView}
          /> ) : (<Employee setPageView = {setPageView}/>)}
        </GridContainer>
    )
}
export default withAuth(Projects)
