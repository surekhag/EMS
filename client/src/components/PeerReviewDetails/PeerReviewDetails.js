import React, { useEffect, useState } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// core components
import Grid from '@material-ui/core/Grid'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle'
import Table from '../Table/Table'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'

import {
  updatePeerReview,
  setUpdateReviewStatus,
  loadAllPeerForUser
} from '../../actions/peerReviewAction'

import { useDispatch, useSelector } from 'react-redux'
import { useToasts, withToastManager } from 'react-toast-notifications'

const styles = {
  ...checkboxAdnRadioStyle,
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
  const peerReviewDetailHeader = ['Feilds', 'Data', 'Feilds', 'Data']
  const [selectedStatus, setSelectedStatus] = useState('Active')

  if (reviewData) {
    tempArray.push(
      [
        'Employee Under Review',
        reviewData.employee_under_review,
        'Employee Reviewing',
        reviewData.employee_reviewing
      ],
      [
        'Project',
        reviewData.project,
        'Functional Manager',
        reviewData.functional_manager
      ],
      [
        'Review From Date',
        reviewData.from_date.slice(0, 10),
        'Review To Date',
        reviewData.to_date.slice(0, 10)
      ],
      [
        'Due From Date',
        reviewData.due_from.slice(0, 10),
        'Due To Date',
        reviewData.due_to.slice(0, 10)
      ],
      ['Form Link', reviewData.review_form_link, 'Status', reviewData.status],
      [
        'Created Date',
        reviewData.created_date.slice(0, 10),
        'Created By',
        reviewData.created_by
      ]
    )
  }
  const changeHandler = e => {
    if (e.target.checked === true) setSelectedStatus('Done')
    else setSelectedStatus('Active')
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
    dispatch(updatePeerReview(reviewData._id, { status: selectedStatus }))
    dispatch(loadAllPeerForUser())
    window.location.reload()
  }
  return (
    <Grid>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>REVIEW DETAILS</h4>
        </CardHeader>
        <CardBody>
          <Grid container>
            <Grid xs={12} sm={12} md={12} item>
              <Table
                tableHeaderColor="gray"
                tableHead={peerReviewDetailHeader}
                tableData={tempArray || null}
                showLink={false}
              />
              {ClickHandler ? (
                <Grid xs={6} sm={6} md={6} item>
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={changeHandler}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.root
                          }}
                        />
                      }
                      label={' I have submitted Form'}
                    />
                  </div>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </CardBody>
        {ClickHandler ? (
          <CardFooter className={classes.footer}>
            <Button type="submit" color="primary" onClick={updateHandler}>
              UPDATE REVIEW
            </Button>
            <Button type="submit" color="primary" onClick={ClickHandler}>
              Close
            </Button>
          </CardFooter>
        ) : null}
      </Card>
      {ClickHandler ? (
        <iframe
          title="myFrame"
          src={reviewData.review_form_link}
          width="100%"
          height="800"
        >
          Loading...
        </iframe>
      ) : null}
    </Grid>
  )
}
const peerReviewDetailsWithHOC = withToastManager(PeerReviewDetails)
export default peerReviewDetailsWithHOC
