import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import GridItem from '../Grid/GridItem'
import Button from '../CustomButtons/Button'
import { getProjectAllocationData } from '../../actions/projectAction'
import {singleProjectAllocationData, singleProjectAllocationDataErr} from '../../selectors/projectAllocationSelector'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../Table/Table'
const useStyles = makeStyles(styles)
export const UpdateProjectAllocation = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { setPageView, setUpdateAction, projectToUpdate } = props
  //In progress
  console.log(projectToUpdate ? projectToUpdate[0]._id : null)
  const project_id = projectToUpdate ? projectToUpdate[0]._id : null
  const projectAllocationDetails =useSelector(singleProjectAllocationData)
  const projectAllocationDetailsErr =useSelector(singleProjectAllocationDataErr)
  const [projectAllocations, setProjectAllocationDetails] = useState([])
  useEffect(() => {
    if (project_id) {
      dispatch(getProjectAllocationData(project_id))
    }
  }, [project_id])

 useEffect(() => {
    if (projectAllocationDetails) {
     console.log(projectAllocationDetails)
      //  projectDetails.push(Object.values(data))
      // console.log(projectAllocationDetails)
      const data = projectAllocationDetails.map((prop)=>{
        const {employee, startdate, enddate,functional_manager} = prop
         console.log(employee.firstname, employee.lastname, startdate, enddate,functional_manager.firstname,functional_manager.lastname )
       
      });
    //  setProjectAllocationDetails(projectAllocationDetails)
    }
  }, [projectAllocationDetails])
   useEffect(() => {
    if (projectAllocationDetailsErr) {
      console.log(projectAllocationDetailsErr)
    }
  }, [projectAllocationDetailsErr])

const projectListingHeader =['tets','test']
  return (
    <>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Project Allocation</h4>
          </CardHeader>
          <CardBody>
            <Table
                  tableHeaderColor="gray"
                  tableHead={
                    projectAllocations && projectAllocations.length > 0
                      ? projectListingHeader
                      : null
                  }
                  // tableData={projectAllocations || null}
                  // addLinks={links}
                  // updateUser={updateUser}
                  // deleteUser={deleteUser}
                  // allocateProject={allocateProject}
                  showLink={false}
                />
          </CardBody>
        </Card>
        <Button
          color="primary"
          //   disabled={isSubmitting}
          onClick={() => {
            setPageView('projectListing')
            setUpdateAction()
          }}
        >
          cancel
        </Button>
      </GridItem>
      {/* <AlertModal
            title="Delete Project"
            showDelDialog={showDelDialog}
            handleYesDelete={handleYesDelete}
            handleNoDelete={handleNoDelete}
            userInfo="Are you sure you want to delete this project ?"
          /> */}
    </>
  )
}
