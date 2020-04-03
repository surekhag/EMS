import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllPeerForUser } from '../../actions/peerReviewAction'

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
import PeerReviewDetails from '../../components/PeerReviewDetails/PeerReviewDetails'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import withAuth from '../../HOC/withAuth'
import { UserContext } from '../../context-provider/user-context'
import { formatDate } from '../../helpers/formatDates'
import {
    userPeerReview,
} from '../../selectors/reviewSelectors'

const useStyles = makeStyles(styles)

const PeerReviewHistory = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const peerReviews = useSelector(userPeerReview)
    const [peerDetails, setPeerDetails] = useState('')
    const { currentUser } = useContext(UserContext)
    const [showDetail, setShowDetail] = useState(false)

    const peerReviewListingHeader = [
        'Employee Under Review',
        'Project',
        'Due Date',
        'Status'
    ]
    useEffect(() => {
        dispatch(loadAllPeerForUser(currentUser._id))
    }, [currentUser._id, dispatch])

    const peerReviewsArray = []
    let filteredReview
    if (peerReviews) {
        filteredReview = peerReviews.filter(
            cls =>
                cls.status === 'Done'
        )
        filteredReview.map((review) => {
            peerReviewsArray.push([
                `${review.employee_under_review.firstname} ${review.employee_under_review.lastname}`,
                review.project.title,
                formatDate(review.to_date),
                review.status
            ])
            return 1
        })
    }

    const onClickHandler = key => {
        setPeerDetails(filteredReview[key])
        setShowDetail(true)
    }
    return (
        <GridContainer>
            {peerReviews && peerReviewsArray.length > 0 ? (
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>PEER REVIEWS</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="gray"
                                tableHead={peerReviewListingHeader}
                                tableData={peerReviewsArray || null}
                                showLink={true}
                                buttonText="Details"
                                onClickHandler={onClickHandler}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            ) : null}
            <Dialog
                title="Peer Review Details"
                maxWidth="lg"
                modal={true}
                open={showDetail}
            >
                <DialogActions>
                    <GridItem xs={12} sm={12} md={12}>
                        <PeerReviewDetails
                            reviewData={peerDetails}
                            showButtons={false}
                        ></PeerReviewDetails>

                        <Button
                            color="primary"
                            size="sm"
                            onClick={() => setShowDetail(false)}
                        >
                            {' '}
              Close
            </Button>
                    </GridItem>
                </DialogActions>
            </Dialog>
        </GridContainer>
    )
}

export default withAuth(PeerReviewHistory)