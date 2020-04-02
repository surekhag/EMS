import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { loadAllSelfReviewsForUser } from '../../actions/selfReviewActions'

// react plugin for creating charts
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons

// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Button from '../../components/CustomButtons/Button'
import { Dialog, DialogActions } from '@material-ui/core'
import Table from '../../components/Table/Table'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import SelfReviewDetails from '../../components/selfReviewDetails/SelfReviewDetails'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import withAuth from '../../HOC/withAuth'
import { UserContext } from '../../context-provider/user-context'
import { formatDate } from '../../helpers/formatDates'
import {
    userSelfReviewDeatils
} from '../../selectors/reviewSelectors'

const useStyles = makeStyles(styles)

const SelfReviewHistory = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const userSelfReviews = useSelector(userSelfReviewDeatils)
    const [selfReviewDetails, setSelfReviewDetails] = useState(null)
    const [projectDetails, setProjectDetails] = useState('')
    const { currentUser } = useContext(UserContext)
    const [showDetail, setShowDetail] = useState(false)

    const SelfReviewListingHeader = [
        'Projects',
        'From date',
        'To date',
        'Due Fom Date',
        'Status'
    ]
    useEffect(() => {
        dispatch(loadAllSelfReviewsForUser(currentUser._id))
    }, [currentUser._id, dispatch])

    const userReviewDetailsArr = []
    let filteredSelfReview
    if (
        userSelfReviews &&
        userSelfReviews.length > 0 &&
        userReviewDetailsArr.length === 0
    ) {
        filteredSelfReview = userSelfReviews.filter(
            cls =>
                cls.status === 'Done'
        )
        filteredSelfReview.map((review) => {
            let projectsArr = review.projects.map(item => item.title)
            userReviewDetailsArr.push([
                projectsArr.join(',\n'),
                formatDate(review.from_date),
                formatDate(review.to_date),
                formatDate(review.due_from),
                review.status
            ])
        })
    }

    const onClickHandler = key => {
        setSelfReviewDetails(filteredSelfReview[key])
        setProjectDetails(userReviewDetailsArr[key])
        setShowDetail(true)
    }
    return (
        <GridContainer>
            {userSelfReviews && userSelfReviews.length > 0 ? (
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>SELF REVIEW</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="gray"
                                tableHead={SelfReviewListingHeader}
                                tableData={userReviewDetailsArr || null}
                                showLink={true}
                                buttonText="Details"
                                onClickHandler={onClickHandler}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            ) : null}

            <Dialog
                title="Self Review Details"
                maxWidth="lg"
                modal={true}
                open={showDetail}
            >
                <DialogActions>
                    <GridItem xs={12} sm={12} md={12}>
                        <SelfReviewDetails
                            selfReviewDeatails={selfReviewDetails}
                            projectDetails={projectDetails}
                            showButtons={false}
                        />
                        <Button
                            color="primary"
                            size="sm"
                            onClick={() => setShowDetail(false)}
                        >
                            Close
                        </Button>
                    </GridItem>
                </DialogActions>
            </Dialog>
        </GridContainer>
    )
}

export default withAuth(SelfReviewHistory)