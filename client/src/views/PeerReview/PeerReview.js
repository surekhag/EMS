import React, { useState, useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/core
import InputLabel from '@material-ui/core/InputLabel'

// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Table from '../../components/Table/Table'
import Card from '../../components/Card/Card'
import Button from '../../components/CustomButtons/Button'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import withAuth from '../../HOC/withAuth'
import { loadAllEmployeeData } from '../../actions/employeeAction'
import { LoadAllPeerReviews } from '../../actions/peerReviewAction'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(styles)

const PeerReview = props => {
    const classes = useStyles()
    const [selectedEmployee, setselectedEmployee] = useState('');
    const [isRedirectForm, setIsRedirectForm] = useState(false)
    const peerReviewListingHeader = ["Employee Under Review","Employee Reviewing","Project","Due Date","Status"]
    const dispatch = useDispatch()
    const employeeData = useSelector(state => state.EmployeeInfo.employeeData)
    const peerReviewData = useSelector(state => state.peerReviewReducer.peerReviewData);
    useEffect(() => {
        dispatch(loadAllEmployeeData())
        dispatch(LoadAllPeerReviews())
    }, [dispatch])

    let tempArr = []
    if (peerReviewData) {
        let filteredEmployee = peerReviewData.data.data.filter(
            cls =>
                cls.employee_under_review
                    .toLowerCase()
                    .includes(selectedEmployee.toLowerCase().trim()) ||
                cls.employee_reviewing
                    .toLowerCase()
                    .includes(selectedEmployee.toLowerCase().trim())
        )
        filteredEmployee.map((review, key) => {
            tempArr.push([review.employee_under_review,
                        review.employee_reviewing,
                        review.project,
                        review.to_date,
                        review.status])
            return 1
        })
    }

    const changeHandler = e => {
        setselectedEmployee(e.target.value)
    }
    const createPeerHandler = ()=>{
        setIsRedirectForm(true);
    }
    return (
        <div>
            {isRedirectForm ?  <Redirect to="/admin/createPeer"></Redirect> : 
            <GridContainer>
                <GridItem  xs={1} sm={1} md={1}>
                    <InputLabel>Search By:</InputLabel>
                </GridItem>
                <GridItem xs={5} sm={5} md={5}>
                    <FormControl >
                        <Select
                            name="SelectEmployee"
                            onChange={changeHandler}
                            value={selectedEmployee}
                            displayEmpty
                            >
                            <MenuItem value="" key={-1} disabled><em>Choose Employee</em></MenuItem>
                            {employeeData ? employeeData.data.data.map((prop, key) => {
                                return prop.status !== "Inactive" ?
                                <MenuItem value={prop.userName} key={key}>{prop.userName}</MenuItem>
                                : null
                            }):null}
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem  style={{"textAlign":"end"}} xs={6} sm={6} md={6}>
                        <Button color="primary" onClick={createPeerHandler}>Create Peer</Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>
                                PEER REVIEW
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="gray"
                                tableHead={
                                    peerReviewListingHeader
                                }
                                tableData={tempArr ? tempArr : null}
                                showLink={false}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>}
        </div> 
        )
    }
    export default withAuth(PeerReview);