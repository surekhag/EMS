import React, { useEffect, useState, useContext } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// core components
import Grid from '@material-ui/core/Grid'
import Button from '../CustomButtons/Button.js'
import Card from '../Card/Card.js'
import CardHeader from '../Card/CardHeader.js'
import { selfReviewStyles } from './SelfReviewStyles'
import Table from '../Table/Table'
import CardBody from '../Card/CardBody.js'
import CardFooter from '../Card/CardFooter.js'
import { UserContext } from '../../context-provider/user-context'
import {
  updateSelfReview,
  clearReviewStatus,
  loadAllSelfReviewsForUser
} from '../../actions/selfReviewActions'

import { useDispatch, useSelector } from 'react-redux'
import { useToasts, withToastManager } from 'react-toast-notifications'
import {
  userSelfReviewUpdateErrorMsg,
  userSelfReviewUpdateStatusMsg
} from './selectors'
const styles = selfReviewStyles
const useStyles = makeStyles(styles)
const SelfReviewDetails = props => {
  const classes = useStyles()
  const { selfReviewDeatails, projectDetails, ClickHandler } = props
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const selfReviewDetailHeader = ['Self Review Details', '']
  let tableData = []
  tableData.push(
    ['Employee Id', selfReviewDeatails.employee_id],
    ['Projects', projectDetails[0]],
    ['From Date', projectDetails[1]],
    ['To Date', projectDetails[2]],
    ['Due From', projectDetails[3]],
    [
      'Due To',
      selfReviewDeatails.due_to ? selfReviewDeatails.due_to.slice(0, 10) : null
    ],
    ['Feedback', selfReviewDeatails.feedback],
    ['Status', selfReviewDeatails.status],
    ['Review Form Link', selfReviewDeatails.review_form_link]
  )

  const [selectedStatus, setSelectedStatus] = useState('Active')
  const userSelfReviewUpdateError = useSelector(userSelfReviewUpdateErrorMsg)
  const userSelfReviewUpdateStatus = useSelector(userSelfReviewUpdateStatusMsg)
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    if (userSelfReviewUpdateStatus) {
      addToast(userSelfReviewUpdateStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      dispatch(loadAllSelfReviewsForUser(currentUser.employee_id))
      dispatch(clearReviewStatus())
      ClickHandler()
    }
  }, [userSelfReviewUpdateStatus, addToast])

  useEffect(() => {
    if (userSelfReviewUpdateError) {
      addToast(userSelfReviewUpdateError, {
        appearance: 'error',
        autoDismiss: true
      })
      dispatch(clearReviewStatus())
    }
  }, [userSelfReviewUpdateError, addToast])

  const changeHandler = e => {
    if (e.target.checked === true) setSelectedStatus('Done')
  }

  const updateHandler = () => {
    dispatch(
      updateSelfReview(selfReviewDeatails._id, { status: selectedStatus })
    )
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
                tableHead={selfReviewDetailHeader}
                tableData={tableData || null}
                showLink={false}
              />
              <Grid xs={6} sm={6} md={6} item>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={changeHandler}
                        checkedIcon={<Check className={classes.checkedIcon} />}
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
            </Grid>
          </Grid>
        </CardBody>
        <CardFooter className={classes.footer}>
          <Button
            type="submit"
            color="primary"
            onClick={updateHandler}
            disabled={selectedStatus === 'Active' ? 'disabled' : null}
          >
            UPDATE REVIEW
          </Button>

          {/* className={classes.disabledButton} */}
          <Button type="submit" color="primary" onClick={ClickHandler}>
            Close
          </Button>
        </CardFooter>
      </Card>
      <iframe
        src={selfReviewDeatails.review_form_link}
        width="100%"
        height="800"
      >
        Loading...
      </iframe>
    </Grid>
  )
}
export default withToastManager(SelfReviewDetails)
