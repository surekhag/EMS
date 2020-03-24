import React, { useEffect, useState } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// core components
import Grid from '@material-ui/core/Grid'
import Button from '../../components/CustomButtons/Button'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle'
import peerReviewDetailsStyle from '../../assets/jss/material-dashboard-react/components/peerReviewDetailsStyle'
import Table from '../Table/Table'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'
import { peerReviewUpdateStatusSelector } from '../../selectors/reviewSelectors'
import { formatDate } from '../../helpers/formatDates'
import {
  updatePeerReview,
  setUpdateReviewStatus,
  loadAllPeerForUser
} from '../../actions/peerReviewAction'

import { useDispatch, useSelector } from 'react-redux'
import { useToasts, withToastManager } from 'react-toast-notifications'

const styles = {
  ...checkboxAdnRadioStyle,
  ...peerReviewDetailsStyle
}

const useStyles = makeStyles(styles)

const PeerReviewDetails = props => {
  const classes = useStyles()
  const { reviewData, ClickHandler } = props
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const peerReviewUpdateStatus = useSelector(peerReviewUpdateStatusSelector)
  const tableDataArray = []
  const peerReviewDetailHeader = []
  const [selectedStatus, setSelectedStatus] = useState('Active')

  if (reviewData) {
    tableDataArray.push(
      [
        <b>Employee Under Review</b>,
        reviewData.employee_under_review.firstname +
        ' ' +
        reviewData.employee_under_review.lastname,
        <b>Employee Reviewing</b>,
        reviewData.employee_reviewing.firstname +
        ' ' +
        reviewData.employee_reviewing.lastname,
        <b>Project</b>,
        reviewData.project.title,
        <b>Functional Manager</b>,
        reviewData.functional_manager.firstname +
        ' ' +
        reviewData.functional_manager.lastname
      ],
      [
        <b>Review From Date</b>,
        formatDate(reviewData.from_date),
        <b>Review To Date</b>,
        formatDate(reviewData.to_date),
        <b>Due From Date</b>,
        formatDate(reviewData.due_from),
        <b>Due To Date</b>,
        formatDate(reviewData.due_to)
      ],
      [
        <b>Form Link</b>,
        reviewData.review_form_link,
        <b>Status</b>,
        reviewData.status,
        <b>Created Date</b>,
        formatDate(reviewData.created_date),
        <b>Created By</b>,
        reviewData.created_by
      ]
    )
  }
  const changeHandler = e => {
    setSelectedStatus(e.target.checked ? 'Done' : 'Active')
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
                tableData={tableDataArray || null}
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
