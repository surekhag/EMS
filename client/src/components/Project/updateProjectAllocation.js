import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { formatDate } from '../../helpers/formatDates'
import GridItem from '../Grid/GridItem'
import Button from '../CustomButtons/Button'
import {
  getProjectAllocationData,
  unassignProject,
  deleteProjectAllocations,
  clearProjectAllocationMsg
} from '../../actions/projectAction'
import { AlertModal } from '../../components/Modal/modal'
import { useToasts } from 'react-toast-notifications'
import {
  singleProjectAllocationData,
  singleProjectAllocationDataErr,
  deallocateProjectError,
  deallocateProjectSuccess,
  delProjectAllocationSuccess,
  delProjectAllocationError
} from '../../selectors/projectAllocationSelector'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../Table/Table'

const useStyles = makeStyles(styles)

export const UpdateProjectAllocation = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const { setPageView, setUpdateAction, projectToUpdate } = props
  const projectAllocationDetails = useSelector(singleProjectAllocationData)
  const projectAllocationDetailsErr = useSelector(
    singleProjectAllocationDataErr
  )
  const deallocateProjectStatus = useSelector(deallocateProjectSuccess)
  const deallocateProjectErr = useSelector(deallocateProjectError)

  const delProjectAllocationStatus = useSelector(delProjectAllocationSuccess)

  const delProjectAllocationErr = useSelector(delProjectAllocationError)

  const [projectAllocations, setProjectAllocations] = useState([])
  const [showDelDialog, setShowDelDialog] = useState(false)
  const [projectAllocationToUpdate, setProjectAllocationToUpdate] = useState(
    null
  )
  const project_id = projectToUpdate ? projectToUpdate[0]._id : null
  const links = ['Deallocate', 'Delete']

  useEffect(() => {
    if (project_id) {
      dispatch(getProjectAllocationData(project_id))
    }
  }, [project_id])

  useEffect(() => {
    if (deallocateProjectStatus) {
      addToast(deallocateProjectStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(clearProjectAllocationMsg())
      //action to fetch data again in sorted order

      //  dispatch(getProjectAllocationData(project_id))
    }
  }, [deallocateProjectStatus, addToast, dispatch])

  useEffect(() => {
    if (delProjectAllocationStatus) {
      addToast(delProjectAllocationStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(clearProjectAllocationMsg())
      //to do fetch data again only for active users
      //  dispatch(getProjectAllocationData(project_id))
    }
  }, [delProjectAllocationStatus, addToast, dispatch])

  useEffect(() => {
    if (deallocateProjectErr) {
      addToast(deallocateProjectErr, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearProjectAllocationMsg())
    }
  }, [deallocateProjectErr, addToast, dispatch])

  useEffect(() => {
    if (delProjectAllocationErr) {
      addToast(delProjectAllocationErr, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearProjectAllocationMsg())
    }
  }, [delProjectAllocationErr, addToast, dispatch])

  useEffect(() => {
    if (projectAllocationDetailsErr) {
      addToast(projectAllocationDetailsErr, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearProjectAllocationMsg())
    }
  }, [projectAllocationDetailsErr])

  useEffect(() => {
    if (projectAllocationDetails) {
      //to do sort data before display
      //need filter for active data only
      console.log(projectAllocationDetails)
      //to do remove this line update - projectAllocationDetails1
      // let projectAllocationDetails1 = [
      //   ...projectAllocationDetails,
      //   ...projectAllocationDetails
      // ]
      const data = projectAllocationDetails.map(prop => {
        let {
          employee: { firstname },
          employee: { lastname },
          startdate,
          enddate,
          functional_manager: { firstname: mgr_firstname },
          functional_manager: { lastname: mgr_lastname },
          project: { title },
          _id
        } = prop

        startdate = formatDate(startdate)
        enddate = formatDate(enddate)
        const emp_name = `${firstname} ${lastname}`
        const mgr_name = `${mgr_firstname} ${mgr_lastname}`

        const projectAllocationData = {
          emp_name,
          title,
          startdate,
          enddate,
          mgr_name,
          _id
        }
        return Object.values(projectAllocationData)
      })

      setProjectAllocations(projectAllocations.concat(data))
    }
  }, [projectAllocationDetails])

  const projectListingHeader = [
    'Employee',
    'Project',
    'Start Date',
    'End Date',
    'Manager'
  ]
  const deallocateProject = val => {
    dispatch(unassignProject(val[5], new Date()))
  }
  const deleteProjectAllocation = val => {
    setProjectAllocationToUpdate(val[5])
    setShowDelDialog(true)
  }
  const handleYesDelete = () => {
    dispatch(deleteProjectAllocations(projectAllocationToUpdate))
    setShowDelDialog(false)
  }

  const handleNoDelete = () => {
    setShowDelDialog(false)
  }
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
              tableData={projectAllocations || null}
              addLinks={links}
              deleteUser={deleteProjectAllocation}
              deallocateProject={deallocateProject}
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
          Back
        </Button>
      </GridItem>
      <AlertModal
        title="Delete Project Allocation"
        showDelDialog={showDelDialog}
        handleYesDelete={handleYesDelete}
        handleNoDelete={handleNoDelete}
        userInfo="Are you sure you want to delete this project allocation ?"
      />
    </>
  )
}
