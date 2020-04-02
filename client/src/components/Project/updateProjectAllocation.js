import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import GridItem from '../Grid/GridItem'
import Button from '../CustomButtons/Button'

const useStyles = makeStyles(styles)
export const UpdateProjectAllocation = props => {
   const classes = useStyles()
  const { setPageView, setUpdateAction, projectToUpdate } = props
  //In progress
  console.log(projectToUpdate)
  useEffect(()=>{

  }, []);
  return (
    <>
      <h1>here </h1>
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

       <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>Project Allocation</h4>
              </CardHeader>
              <CardBody>
                {/* <Table
                  tableHeaderColor="gray"
                  tableHead={
                    projectData && projectDetails.length > 0
                      ? projectListingHeader
                      : null
                  }
                  tableData={projectDetails || null}
                  addLinks={links}
                  updateUser={updateUser}
                  deleteUser={deleteUser}
                  allocateProject={allocateProject}
                  showLink={false}
                /> */}
              </CardBody>
            </Card>
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
