import React, { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LoadAllPeerForUser } from '../../actions/peerReviewAction'
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
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import withAuth from '../../HOC/withAuth'
import { UserContext } from '../../context-provider/user-context'

const useStyles = makeStyles(styles)
const Dashboard = props => {
  const classes = useStyles()
  const [searchText, setsearchText] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  const [peerDetails, setPeerDetails] = useState('')
  const { currentUser } = useContext(UserContext)
  const dispatch = useDispatch()
  const peerReviewListingHeader = [
    'Employee Under Review',
    'Project',
    'Due Date',
    'Status'
  ]
  const peerReviews = useSelector(
    state => state.peerReviewReducer.userPeerReview
  )

  useEffect(() => {
    dispatch(LoadAllPeerForUser())
  }, [dispatch])

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
  const onClickHandler = key => {
    setPeerDetails(filteredEmployee[key])
    setShowDetail(true)
  }
  const changeHandler = e => {
    setsearchText(e.target.value)
  }
  const detailsSwitchHandler = () => {
    setShowDetail(false)
  }
  return (
    <div>
      {showDetail ? (
        <PeerReviewDetails
          reviewData={peerDetails}
          ClickHandler={detailsSwitchHandler}
        ></PeerReviewDetails>
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
        </GridContainer>
      )}
    </div>
  )
}
export default withAuth(Dashboard)
