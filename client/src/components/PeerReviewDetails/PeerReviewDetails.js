import React, { useEffect, useState } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
// core components
import Grid from '@material-ui/core/Grid'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Table from '../Table/Table'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'

import {
  UpdatePeerReview,
  setUpdateReviewStatus
} from '../../actions/peerReviewAction'
import { LoadAllPeerForUser } from '../../actions/peerReviewAction'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts, withToastManager } from 'react-toast-notifications'

const styles = {
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  grid: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  formControl: {
    margin: 11,
    minWidth: 200
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

const useStyles = makeStyles(styles)

const PeerReviewDetails = props => {
  const classes = useStyles()
  const { reviewData, ClickHandler } = props
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const peerReviewUpdateStatus = useSelector(
    state => state.peerReviewReducer.peerReviewUpdateStatus
  )
  const tempArray = []
  const peerReviewDetailHeader = ['Feilds', 'Data']
  const [selectedStatus, setSelectedStatus] = useState('')

  if (reviewData) {
    tempArray.push(
      ['Employee Under Review', reviewData.employee_under_review],
      ['Employee Reviewing', reviewData.employee_reviewing],
      ['Project', reviewData.project],
      ['From Date', reviewData.from_date.slice(0, 10)],
      ['To Date', reviewData.to_date.slice(0, 10)],
      ['Due From Date', reviewData.due_from.slice(0, 10)],
      ['Due To Date', reviewData.due_to.slice(0, 10)],
      ['Form Link', reviewData.review_form_link],
      ['Status', reviewData.status],
      ['Created Date', reviewData.created_date.slice(0, 10)],
      ['Created By', reviewData.created_by]
    )
  }
  const changeHandler = e => {
    setSelectedStatus(e.target.value)
  }
  useEffect(() => {
    if (peerReviewUpdateStatus) {
      if (peerReviewUpdateStatus.status === 200) {
        addToast('Review updated successfully!!!', {
          appearance: 'success',
          autoDismiss: true
        })
      } else {
        addToast('Error while saving form', {
          appearance: 'error',
          autoDismiss: true
        })
      }
      dispatch(setUpdateReviewStatus(''))
    }
  }, [peerReviewUpdateStatus, addToast, dispatch])
  const updateHandler = () => {
    if (selectedStatus === '') {
      dispatch(UpdatePeerReview(reviewData._id, { status: reviewData.status }))
    } else {
      dispatch(UpdatePeerReview(reviewData._id, { status: selectedStatus }))
    }
    dispatch(LoadAllPeerForUser())
  }
  return (
    <Grid>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>REVIEW DETAILS</h4>
        </CardHeader>
        <CardBody>
          <Grid container>
            <Grid xs={0} sm={0} md={2} item></Grid>
            <Grid xs={12} sm={12} md={8} item>
              <Table
                tableHeaderColor="gray"
                tableHead={peerReviewDetailHeader}
                tableData={tempArray || null}
                showLink={false}
              />
              <Grid xs={6} sm={6} md={6} className={classes.grid} item>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="SelectStatus">Change Status</InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={changeHandler}
                    inputProps={{
                      name: 'SelectStatus',
                      id: 'SelectStatus'
                    }}
                  >
                    <MenuItem className={classes.hoverEffect} value="Done">
                      Done
                    </MenuItem>
                    <MenuItem
                      className={classes.hoverEffect}
                      value="InProgress"
                    >
                      In Progress
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid xs={0} sm={0} md={2} item></Grid>
          </Grid>
        </CardBody>
        <CardFooter className={classes.footer}>
          <Button type="submit" color="primary" onClick={updateHandler}>
            UPDATE REVIEW
          </Button>
          <Button type="submit" color="primary" onClick={ClickHandler}>
            Close
          </Button>
        </CardFooter>
      </Card>
      <iframe
        src={reviewData.review_form_link}
        width="100%"
        height="800"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Loading...
      </iframe>
    </Grid>
  )
}
const peerReviewDetailsWithHOC = withToastManager(PeerReviewDetails)
export default peerReviewDetailsWithHOC
