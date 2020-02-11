import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllEmployeeData } from '../../actions/index.js'
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


import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js'

const useStyles = makeStyles(styles)
const Dashboard = props => {
    const classes = useStyles()
    const [searchText, setsearchText] = useState('');
    // const [selectedCity, setSelectedCity] = useState('')
    // const [multipleStatesName, setMultipleStatesName] = useState([])
    const dispatch = useDispatch()
    const EmployeeData = useSelector(state => state.EmployeeInfo.EmployeeData)
    const loadAllEmployee = () => {
        dispatch(loadAllEmployeeData())
    }
    useEffect(() => {
        loadAllEmployee()
    }, [])
    let tempArr = []
        if (EmployeeData) {
            let filteredEmployee = EmployeeData.data.data.filter(
                cls =>
                    cls.userName
                        .toLowerCase()
                        .includes(searchText.toLowerCase().trim())
            )
            filteredEmployee.map((key, value) => {
                tempArr.push(Object.values(key))
            })
        }
    const changeHandler = e => {
        setsearchText(e.target.value);
    } 
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                        <InputLabel className={classes.cardTitle}>
                            Welcome RAKSHANDA
                        </InputLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                        formControlProps={{
                            className: classes.margin + ' ' + classes.search
                        }}
                        inputProps={{
                            onChange: changeHandler,
                            placeholder: 'Search Employee',
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
                            <h4 className={classes.cardTitleWhite}>
                                Employee List
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="gray"
                                tableHead={
                                    EmployeeData
                                        ? Object.keys(
                                            EmployeeData.data.data[0]
                                          )
                                        : null
                                }
                                tableData={tempArr ? tempArr : null}
                                showLink={false}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
    )
}
export default Dashboard
