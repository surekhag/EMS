import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


// core components
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import { useSelector } from 'react-redux';

const styles = {
    ...checkboxAdnRadioStyle,
    cardCategoryWhite: {
        color: 'rgba(255,255,255,.62)',
        margin: '0',
        fontSize: '14px',
        marginTop: '0',
        marginBottom: '0'
    },
    cardTitleWhite: {
        color: '#FFFFFF',
        marginTop: '0px',
        minHeight: 'auto',
        fontWeight: '300',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: '3px',
        textDecoration: 'none'
    },
    marginSet : {
        marginTop: "27px",
    }
}

const useStyles = makeStyles(styles)

const CreatePeerForm =()=>{
    const classes = useStyles();
    const employeeData = useSelector(state => state.EmployeeInfo.employeeData)
    const [selectedEmployee, setselectedEmployee] = useState('');
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };
    const changeHandler = e => {
        setselectedEmployee(e.target.value)
    }
    
    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>
                                CREATE PEER FORM
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer className={classes.marginSet}>
                                <GridItem xs={12} sm={12} md={5}>
                                    <CustomInput
                                        labelText="Object Edge"
                                        id="company-disabled"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer >
                            <GridContainer className={classes.marginSet}>
                                <GridItem xs={6} sm={6} md={3}>
                                    Employee Under Review
                                </GridItem>
                                <GridItem xs={6} sm={6} md={3}>
                                <FormControl >
                                    <Select
                                        name="SelectEmployee"
                                        onChange={changeHandler}
                                        value={selectedEmployee}
                                        displayEmpty
                                        >
                                        <MenuItem value="" key={-1} disabled>Select Employee</MenuItem>
                                        {employeeData ? employeeData.data.data.map((prop, key) => {
                                            return prop.status !== "Inactive" ?
                                            <MenuItem value={prop.userName} key={key}>{prop.userName}</MenuItem>
                                            : null
                                        }):null}
                                    </Select>
                                </FormControl>
                                </GridItem>
                                <GridItem xs={6} sm={6} md={3}>
                                    Employee Reviewing
                                </GridItem>
                                <GridItem xs={6} sm={6} md={3}>
                                <FormControl >
                                    <Select
                                        name="SelectEmployee"
                                        onChange={changeHandler}
                                        value={selectedEmployee}
                                        displayEmpty
                                        >
                                        <MenuItem value="" key={-1} disabled>Select Employee</MenuItem>
                                        {employeeData ? employeeData.data.data.map((prop, key) => {
                                            return prop.status !== "Inactive" ?
                                            <MenuItem value={prop.userName} key={key}>{prop.userName}</MenuItem>
                                            : null
                                        }):null}
                                    </Select>
                                </FormControl>
                                </GridItem>
                            </GridContainer >
                            <GridContainer className={classes.marginSet}>
                                <GridItem xs={6} sm={6} md={3}>
                                        Project
                                </GridItem>
                                <GridItem xs={6} sm={6} md={3}>
                                    <FormControl >
                                        <Select
                                            name="SelectEmployee"
                                            onChange={changeHandler}
                                            value={selectedEmployee}
                                            displayEmpty
                                            >
                                            <MenuItem value="" key={-1} disabled>Select Project</MenuItem>
                                            {employeeData ? employeeData.data.data.map((prop, key) => {
                                                return prop.status !== "Inactive" ?
                                                <MenuItem value={prop.userName} key={key}>{prop.userName}</MenuItem>
                                                : null
                                            }):null}
                                        </Select>
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                            <GridContainer className={classes.marginSet}>
                                <GridItem xs={6} sm={6} md={3}>
                                        From Date
                                </GridItem>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <GridItem xs={6} sm={6} md={3}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </GridItem>
                                </MuiPickersUtilsProvider>
                                <GridItem xs={6} sm={6} md={3}>
                                        Due Date
                                </GridItem>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <GridItem xs={6} sm={6} md={3}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </GridItem>
                                </MuiPickersUtilsProvider>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel style={{ color: "#AAAAAA" }}>Link</InputLabel>
                                    <CustomInput
                                        id="about-me"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            multiline: true,
                                            rows: 2
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary">CREATE PEER</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
        </GridContainer>
    )

}

export default CreatePeerForm;