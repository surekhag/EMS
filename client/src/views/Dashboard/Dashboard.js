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
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Button from '../../components/CustomButtons/Button.js'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Table from '../../components/Table/Table.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardBody from '../../components/Card/CardBody.js'
import PeerReviewDetails from '../../components/PeerReviewDetails/PeerReviewDetails'
import SelfReviewDetails from '../../components/selfReviewDetails/SelfReviewDetails'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import withAuth from '../../HOC/withAuth'
import { UserContext } from '../../context-provider/user-context'
import { loadAllProjects } from '../../actions/projectAction'
import { loadAllEmployeeData } from '../../actions/employeeAction.js'

const useStyles = makeStyles(styles)
const Dashboard = props => {
  const classes = useStyles()
  const [searchText, setsearchText] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  const [showSelfReviewDetail, setShowSelfreviewDetail] = useState(false)
  const [peerDetails, setPeerDetails] = useState('')
  const [selfReviewDetails, setSelfReviewDetails] = useState()
  const [projectDetails, setProjectDetails] = useState()
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
  const peerReviews = useSelector(
    state => state.peerReviewReducer.userPeerReview
  )
  const userSelfReviews = useSelector(
    state => state.selfReviewReducer.userSelfReviewDeatils
  )
  const projectData = useSelector(state => state.projectReducer.projects)
  // const employeeData = useSelector(state => state.EmployeeInfo.employeeData)

  useEffect(() => {
    dispatch(loadAllPeerForUser())
    dispatch(loadAllSelfReviewsForUser(currentUser.employee_id))
  }, [dispatch])

  useEffect(() => {
    if (userSelfReviews && userSelfReviews.length > 0) {
      // dispatch(loadAllEmployeeData())
      dispatch(loadAllProjects())
    }
  }, [dispatch, userSelfReviews])

  const tempArr = []
  let filteredEmployee
  if (peerReviews) {
    filteredEmployee = peerReviews.data.data.filter(
      cls =>
        cls.employee_under_review
          .toLowerCase()
          .includes(searchText.toLowerCase().trim()) &&
        cls.status !== 'Done' &&
        cls.status !== 'Inactive'
    )
    filteredEmployee.map((review, key) => {
      tempArr.push([
        review.employee_under_review,
        review.project,
        review.to_date.slice(0, 10),
        review.status
      ])
      return 1
    })
  }
  const userReviewDetailsArr = []
  let projects
  let projectsArr = []
  if (
    userSelfReviews &&
    userSelfReviews.length > 0 &&
    userReviewDetailsArr.length == 0 &&
    projectData
  ) {
    userSelfReviews.map((review, key1) => {
      projects = review.project_ids.split(',')
      projectData.map((item, key) => {
        if (projects[key] && item._id == projects[key].trim()) {
          projectsArr.push([item.title])
        }
      })
      userReviewDetailsArr.push([
        projectsArr.join('\n'),
        review.from_date.slice(0, 10),
        review.to_date.slice(0, 10),
        review.due_from.slice(0, 10),
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
          ClickHandler={detailsSwitchHandler}
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
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>PEER REVIEWS</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="gray"
                  tableHead={peerReviewListingHeader}
                  tableData={tempArr || null}
                  showLink={true}
                  buttonText="Details"
                  onClickHandler={onClickHandler}
                />
              </CardBody>
            </Card>
          </GridItem>

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
