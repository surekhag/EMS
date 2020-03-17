import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { withToastManager, useToasts } from 'react-toast-notifications'
import { compose } from 'redux'
// @material-ui/core
import InputLabel from '@material-ui/core/InputLabel'

// core components
import GridItem from '../../components/Grid/GridItem'
import Grid from '@material-ui/core/Grid'
import { Dialog, DialogActions } from '@material-ui/core'
import GridContainer from '../../components/Grid/GridContainer'
import Table from '../../components/Table/Table'
import Card from '../../components/Card/Card'
import Button from '../../components/CustomButtons/Button'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import CreatePeerForm from '../../components/CreatePeerForm/CreatePeerForm'
import PeerReviewDetails from '../../components/PeerReviewDetails/PeerReviewDetails'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import withAuth from '../../HOC/withAuth'
import { loadAllEmployeeData } from '../../actions/employeeAction'
import {
  loadAllPeerReviews,
  deletePeerReview
} from '../../actions/peerReviewAction'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'

const style = {
  ...styles,
  formControl: {
    margin: 11,
    minWidth: 200
  },
  selectEmpty: {
    marginTop: 10
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },
  showPointer: {
    cursor: 'pointer'
  },
  hoverEffect: {
    '&:focus': {
      backgroundColor: '#004de6',
      color: 'white'
    },
    '&:hover': {
      backgroundColor: '#004de6',
      color: 'white',
      opacity: '0.5'
    }
  }
}

const useStyles = makeStyles(style)

const PeerReview = props => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const [selectedEmployee, setselectedEmployee] = useState('')
  const [isRedirectForm, setIsRedirectForm] = useState(false)
  const [updateInfo, setUpdateInfo] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const peerReviewListingHeader = [
    'Employee Under Review',
    'Employee Reviewing',
    'Project',
    'Due Date',
    'Status'
  ]
  const dispatch = useDispatch()
  const [showDelDialog, setShowDelDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [reviewDetails, setReviewDetails] = useState('')
  const links = ['Update', 'Delete']
  const employeeData = useSelector(state => state.EmployeeInfo.employeeData)
  const peerReviewData = useSelector(
    state => state.peerReviewReducer.peerReviewData
  )
  const peerReviewDeleteSuccess = useSelector(
    state => state.peerReviewReducer.peerReviewDeleteSuccess
  )
  const peerReviewDeleteError = useSelector(
    state => state.peerReviewReducer.peerReviewDeleteError
  )
  useEffect(() => {
    dispatch(loadAllEmployeeData())
    dispatch(loadAllPeerReviews())
  }, [dispatch])
  useEffect(() => {
    if (peerReviewDeleteSuccess) {
      if (peerReviewDeleteSuccess.status === 200) {
        addToast('Peer Review successfully deleted', {
          appearance: 'success',
          autoDismiss: true
        })
      } else {
        addToast('Error while deleting Peer Review', {
          appearance: 'error',
          autoDismiss: true
        })
      }
    } else if (peerReviewDeleteError) {
      addToast('Error while deleting Peer Review', {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }, [peerReviewDeleteSuccess, peerReviewDeleteError, addToast])

  const viewDetailHandler = details => {
    setReviewDetails(details)
    setShowDetailsDialog(true)
  }
  const tempArr = []
  let filteredEmployee
  if (peerReviewData) {
    filteredEmployee = peerReviewData.data.data.filter(
      cls =>
        cls.employee_under_review
          .toLowerCase()
          .includes(selectedEmployee.toLowerCase().trim()) &&
        cls.status !== 'Inactive'
    )
    filteredEmployee.map((review, key) => {
      tempArr.push([
        <span
          className={classes.showPointer}
          onClick={() => viewDetailHandler(review)}
        >
          {review.employee_under_review}
        </span>,
        review.employee_reviewing,
        review.project,
        review.to_date.slice(0, 10),
        review.status
      ])
      return 1
    })
  }

  const changeHandler = e => {
    setselectedEmployee(e.target.value)
  }
  const createPeerHandler = () => {
    setUpdateInfo('')
    setIsRedirectForm(true)
  }
  const detailsSwitchHandler = () => {
    setIsRedirectForm(false)
    // window.location.reload()
  }
  const updateUser = (val, k) => {
    setUpdateInfo(filteredEmployee[k])
    setIsRedirectForm(true)
  }

  const deleteUser = (val, k) => {
    setDeleteId(filteredEmployee[k]._id)
    setShowDelDialog(true)
  }
  const handleYesDelete = () => {
    dispatch(deletePeerReview(deleteId))
    setShowDelDialog(false)
  }
  return (
    <div>
      {isRedirectForm ? (
        <CreatePeerForm
          updateInfo={updateInfo}
          ClickHandler={detailsSwitchHandler}
        ></CreatePeerForm>
      ) : (
          <GridContainer>
            <Grid xs={1} sm={1} md={1} className={classes.grid} item>
              <InputLabel>Search By:</InputLabel>
            </Grid>
            <GridItem xs={5} sm={5} md={5}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="SelectEmployee"> Select Employee</InputLabel>
                <Select
                  value={selectedEmployee}
                  onChange={changeHandler}
                  inputProps={{
                    name: 'SelectEmployee',
                    id: 'SelectEmployee'
                  }}
                >
                  <MenuItem className={classes.hoverEffect} value="">
                    <em>None</em>
                  </MenuItem>
                  {employeeData
                    ? employeeData.map((prop, key) => {
                      return prop.status !== 'Inactive' ? (
                        <MenuItem
                          className={classes.hoverEffect}
                          value={prop.userName}
                          key={key}
                        >
                          {prop.userName}
                        </MenuItem>
                      ) : null
                    })
                    : null}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem style={{ textAlign: 'end' }} xs={6} sm={6} md={6}>
              <Button color="primary" onClick={createPeerHandler}>
                Create Peer
            </Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card plain>
                <CardHeader plain color="primary">
                  <h4 className={classes.cardTitleWhite}>PEER REVIEW</h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="gray"
                    tableHead={peerReviewListingHeader}
                    tableData={tempArr || null}
                    addLinks={links}
                    updateUser={updateUser}
                    deleteUser={deleteUser}
                    showLink={false}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      <Dialog title="Delete Peer" modal={true} open={showDelDialog}>
        <DialogActions>
          <GridItem xs={12} sm={12} md={12}>
            <p> Are you sure you want to delete this Peer Review ? </p>
            <Button color="success" size="sm" onClick={handleYesDelete}>
              {' '}
              Yes
            </Button>{' '}
            <Button
              color="danger"
              size="sm"
              onClick={() => setShowDelDialog(false)}
            >
              {' '}
              No
            </Button>
          </GridItem>
        </DialogActions>
      </Dialog>
      <Dialog title="Peer Review Details" modal={true} open={showDetailsDialog}>
        <DialogActions>
          <GridItem xs={12} sm={12} md={12}>
            <PeerReviewDetails reviewData={reviewDetails}></PeerReviewDetails>

            <Button
              color="primary"
              size="sm"
              onClick={() => setShowDetailsDialog(false)}
            >
              {' '}
              Close
            </Button>
          </GridItem>
        </DialogActions>
      </Dialog>
    </div>
  )
}
const peerReviewWithHOC = compose(withToastManager, withAuth)(PeerReview)
export default peerReviewWithHOC
