import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {loadAllProjects} from '../../actions/projectAction'
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import Button from '../../components/CustomButtons/Button'
import InputLabel from '@material-ui/core/InputLabel'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import ProjectListing from '../../components/Project/ProjectListing'
import Project from '../../components/Project/Project'
import ProjectAllocation from '../../components/Project/ProjectAllocation'
import withAuth from '../../HOC/withAuth'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { UserContext } from '../../context-provider/user-context'

const useStyles = makeStyles(styles)

const Projects = props => {
    const dispatch = useDispatch()
    const [pageView, setPageView] = useState("projectListing");
    const projectData = useSelector(state => state.projectReducer.projects)

    useEffect(() => {
        dispatch(loadAllProjects());
    }, [dispatch])

    const handleAddProject = ()=>{
      setPageView('addNewProject');
    }

    const handleAllocateProject = ()=>{
      setPageView('allocateProject');
    }

    const handlesearchProject = ()=>{
      setPageView('projectListing');
    }

    return (
        <GridContainer>
            <GridItem style={{ textAlign: 'end' }} xs={12} sm={12} md={12}> 
            {pageView == "projectListing" ? <>
            <Button type="submit" color="primary" onClick = {handleAddProject} > ADD PROJECT </Button>           
            <Button type="submit" color="primary" onClick = {handleAllocateProject} > ALLOCATE PROJECT </Button>   
            </> 

            :  <Button type="submit" color="primary" onClick = {handlesearchProject} >  Back To Projects   </Button>
}
            </GridItem>
           
          {pageView == "projectListing" ?  ( <ProjectListing          
          projectData = {projectData } setPageView = {setPageView}
          /> ) : pageView == "addNewProject" ?  (<Project setPageView = {setPageView}/>) :(<ProjectAllocation setPageView = {setPageView} />)
          
          
          
         }
        </GridContainer>
    )
}
export default withAuth(Projects)
