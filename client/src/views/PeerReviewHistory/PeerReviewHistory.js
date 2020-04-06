import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllPeerForUser, loadAllPeerReviews } from '../../actions/peerReviewAction'
import GroupIcon from '@material-ui/icons/Group'
import Person from '@material-ui/icons/Person'
// react plugin for creating charts

// @material-ui/icons

// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Button from '../../components/CustomButtons/Button'
import { Dialog, DialogActions } from '@material-ui/core'
import Table from '../../components/Table/Table'
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import PeerReviewDetails from '../../components/PeerReviewDetails/PeerReviewDetails'
import withAuth from '../../HOC/withAuth'
import { UserContext } from '../../context-provider/user-context'
import { formatDate } from '../../helpers/formatDates'
import {
    userPeerReview,
    peerReviewDataSelector
} from '../../selectors/reviewSelectors'

const PeerReviewHistory = props => {
    const dispatch = useDispatch()
    const peerReviews = useSelector(userPeerReview)
    const peerReviewData = useSelector(peerReviewDataSelector)
    const [peerDetails, setPeerDetails] = useState('')
    const { currentUser } = useContext(UserContext)
    const [showDetail, setShowDetail] = useState(false)

    const peerReviewListingHeader = [
        'Employee Under Review',
        'Project',
        'Due Date',
        'Status'
    ]
    const employeeReviewListingHeader = [
        'Employee Under Review',
        'Employee Reviewing',
        'Project',
        'Due Date',
        'Status'
    ]
    useEffect(() => {
        dispatch(loadAllPeerForUser(currentUser._id))
        if (currentUser.userRole === "manager")
            dispatch(loadAllPeerReviews())
    }, [currentUser._id, dispatch])

    const employeePeerReviewArr = []
    let filteredEmployeeReview
    if (currentUser.userRole === "manager" && peerReviewData) {
        filteredEmployeeReview = peerReviewData.data.data.filter(
            cls =>
                currentUser._id === cls.functional_manager._id &&
                cls.status === 'Done'
        )
        filteredEmployeeReview.map((review, key) => {
            employeePeerReviewArr.push([
                `${review.employee_under_review.firstname} ${review.employee_under_review.lastname}`,
                `${review.employee_reviewing.firstname} ${review.employee_reviewing.lastname}`,
                review.project.title,
                formatDate(review.to_date),
                review.status
            ])
            return 1
        })
    }
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
    const onClickEmployeeDetailsHandler = key => {
        console.log("hey", filteredEmployeeReview, key)
        setPeerDetails(filteredEmployeeReview[key])
        setShowDetail(true)
    }
    return (
        <GridContainer>
            <GridItem>
                <CustomTabs
                    title=""
                    headerColor="primary"
                    tabs={[
                        {
                            tabName: "My Reviews",
                            tabIcon: Person,
                            tabContent: (
                                <Table
                                    tableHeaderColor="gray"
                                    tableHead={peerReviewListingHeader}
                                    tableData={peerReviewsArray || null}
                                    showLink={true}
                                    buttonText="Details"
                                    onClickHandler={onClickHandler}
                                />
                            )
                        },
                        currentUser.userRole === "manager" && {
                            tabName: "Employee Reviews",
                            tabIcon: GroupIcon,
                            tabContent: (
                                <Table
                                    tableHeaderColor="gray"
                                    tableHead={employeeReviewListingHeader}
                                    tableData={employeePeerReviewArr || null}
                                    showLink={true}
                                    buttonText="Details"
                                    onClickHandler={onClickEmployeeDetailsHandler}
                                />
                            )
                        }

                    ]}
                />
            </GridItem>
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
                            Close
            </Button>
                    </GridItem>
                </DialogActions>
            </Dialog>
        </GridContainer>
    )
}

export default withAuth(PeerReviewHistory)