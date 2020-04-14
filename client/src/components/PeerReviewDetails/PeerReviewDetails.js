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
  const { reviewData, closeHandler, showButtons } = props
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const peerReviewUpdateStatus = useSelector(peerReviewUpdateStatusSelector)
  const tableDataArray = []
  const peerReviewDetailHeader = []
  const [selectedStatus, setSelectedStatus] = useState('Active')
  const {
    _id,
    employee_under_review,
    employee_reviewing,
    project,
    functional_manager,
    from_date,
    to_date,
    due_from,
    due_to,
    review_form_link
  } = reviewData
  if (reviewData) {
    tableDataArray.push(
      [
        <span className={classes.boldFont}>Employee Under Review</span>,
        `${employee_under_review.firstname} ${employee_under_review.lastname}`,
        <span className={classes.boldFont}>Employee Reviewing</span>,
        `${employee_reviewing.firstname} ${employee_reviewing.lastname}`,
        <span className={classes.boldFont}>Project</span>,
        project.title,
        <span className={classes.boldFont}>Functional Manager</span>,
        `${functional_manager.firstname} ${functional_manager.lastname}`
      ],
      [
        <span className={classes.boldFont}>Review From Date</span>,
        formatDate(from_date),
        <span className={classes.boldFont}>Review To Date</span>,
        formatDate(to_date),
        <span className={classes.boldFont}>Due From Date</span>,
        formatDate(due_from),
        <span className={classes.boldFont}>Due To Date</span>,
        formatDate(due_to)
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
        closeHandler()
      } else {
        addToast('Error while saving form', {
          appearance: 'error',
          autoDismiss: true
        })
      }
      dispatch(setUpdateReviewStatus(''))
    }
  }, [peerReviewUpdateStatus, addToast, dispatch, closeHandler])
  const updateHandler = () => {
    dispatch(updatePeerReview(_id, { status: selectedStatus }))
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
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              {showButtons ? (
                <iframe
                  title="myFrame"
                  src={review_form_link}
                  width="100%"
                  height="800"
                >
                  Loading...
                </iframe>
              ) : null}
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              {showButtons ? (
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
        {showButtons ? (
          <CardFooter className={classes.footer}>
            <Button type="submit" color="primary" onClick={updateHandler}>
              UPDATE REVIEW
            </Button>
            <Button type="submit" color="white" onClick={closeHandler}>
              Close
            </Button>
          </CardFooter>
        ) : null}
      </Card>
    </Grid>
  )
}
const peerReviewDetailsWithHOC = withToastManager(PeerReviewDetails)
export default peerReviewDetailsWithHOC
