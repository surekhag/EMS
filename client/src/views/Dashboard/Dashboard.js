import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllPeerForUser } from '../../actions/peerReviewAction'
import { loadAllSelfReviewsForUser } from '../../actions/selfReviewActions'
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
// @material-ui/icons
import Search from '@material-ui/icons/Search'
// core components
import CustomInput from '../../components/CustomInput/CustomInput'
import Button from '../../components/CustomButtons/Button'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Table from '../../components/Table/Table'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import PeerReviewDetails from '../../components/PeerReviewDetails/PeerReviewDetails'
import SelfReviewDetails from '../../components/selfReviewDetails/SelfReviewDetails'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import withAuth from '../../HOC/withAuth'
import { UserContext } from '../../context-provider/user-context'
import { formatDate } from '../../helpers/formatDates'
import {
  userPeerReview,
  userSelfReviewDeatils
} from '../../selectors/reviewSelectors'
const useStyles = makeStyles(styles)
const Dashboard = props => {
  const classes = useStyles()
  const [searchText, setsearchText] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  const [showSelfReviewDetail, setShowSelfreviewDetail] = useState(false)
  const [peerDetails, setPeerDetails] = useState('')
  const [selfReviewDetails, setSelfReviewDetails] = useState(null)
  const [projectDetails, setProjectDetails] = useState('')
  const { currentUser } = useContext(UserContext)
  const dispatch = useDispatch()
  const peerReviewListingHeader = [
    'Employee Under Review',
    'Project',
    'Due Date',
    'Status'
  ]

  const SelfReviewListingHeader = [
    'Projects',
    'From date',
    'To date',
    'Due Fom Date',
    'Status'
  ]

  const peerReviews = useSelector(userPeerReview)
  const userSelfReviews = useSelector(userSelfReviewDeatils)
  useEffect(() => {
    console.log(currentUser.userRole)
    dispatch(loadAllPeerForUser(currentUser._id))
    dispatch(loadAllSelfReviewsForUser(currentUser._id))
  }, [dispatch])

  const peerReviewsArray = []
  let filteredEmployee
  if (peerReviews) {
    filteredEmployee = peerReviews.filter(
      cls =>
        cls.employee_under_review.firstname +
          ' ' +
          cls.employee_under_review.lastname
            .toLowerCase()
            .includes(searchText.toLowerCase().trim()) &&
        cls.status !== 'Done' &&
        cls.status !== 'Inactive'
    )
    filteredEmployee.map((review, key) => {
      peerReviewsArray.push([
        review.employee_under_review.firstname +
          ' ' +
          review.employee_under_review.lastname,
        review.project.title,
        formatDate(review.to_date),
        review.status
      ])
      return 1
    })
  }
  const userReviewDetailsArr = []
  let projectsArr = []
  if (
    userSelfReviews &&
    userSelfReviews.length > 0 &&
    userReviewDetailsArr.length == 0
  ) {
    userSelfReviews.map((review, key1) => {
      review.projects.map((item, key) => {
        {
          projectsArr.push([item.title])
        }
      })
      userReviewDetailsArr.push([
        projectsArr.join(', '),
        formatDate(review.from_date),
        formatDate(review.to_date),
        formatDate(review.due_from),
        review.status
      ])
      projectsArr = []
    })
  }

  const onClickHandler = key => {
    setPeerDetails(filteredEmployee[key])
    setShowDetail(true)
  }
  const handleSelfReviewDetails = key => {
    setSelfReviewDetails(userSelfReviews[key])
    setProjectDetails(userReviewDetailsArr[key])
    setShowSelfreviewDetail(true)
  }

  const changeHandler = e => {
    setsearchText(e.target.value)
  }
  const detailsSwitchHandler = () => {
    setShowDetail(false)
  }
  const closeSelfReiewDetails = () => {
    setShowSelfreviewDetail(false)
  }
  return (
    <div>
      {showDetail ? (
        <PeerReviewDetails
          reviewData={peerDetails}
          closeHandler={detailsSwitchHandler}
          showButtons={true}
        ></PeerReviewDetails>
      ) : showSelfReviewDetail ? (
        <SelfReviewDetails
          selfReviewDeatails={selfReviewDetails}
          projectDetails={projectDetails}
          ClickHandler={closeSelfReiewDetails}
        />
      ) : (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <InputLabel className={classes.cardTitle}>
              Welcome {currentUser ? currentUser.userName : null}
            </InputLabel>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            {currentUser && currentUser.userRole === 'Admin' ? (
              <>
                <CustomInput
                  formControlProps={{
                    className: classes.margin + ' ' + classes.search
                  }}
                  inputProps={{
                    onChange: changeHandler,
                    placeholder: 'Search Peer',
                    inputProps: {
                      'aria-label': 'Search'
                    }
                  }}
                />
                <Button color="white" aria-label="edit" justIcon round>
                  <Search />
                </Button>
              </>
            ) : null}
          </GridItem>
          {peerReviews ? (
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
                    onClickHandler={handleSelfReviewDetails}
                  />
                </CardBody>
              </Card>
            </GridItem>
          ) : null}
        </GridContainer>
      )}
    </div>
  )
}
export default withAuth(Dashboard)
