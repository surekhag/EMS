import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Button from '../../components/CustomButtons/Button.js'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Select from '@material-ui/core/Select'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import { Radio, RadioGroup } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
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
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: 11,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: 10
  }
}
const useStyles = makeStyles(styles)
const Employee = () => {
  const classes = useStyles()
  const [selectedOption, setSelectedOption] = useState('add_new_employee')
  const [selectedOptionTest, setSelectedOptionTest] = useState()

  const handleOptionChange = event => {
    setSelectedOption(event.target.value)
  }
  const handleDateChange = date => {
    setSelectedDate(date)
  }
  const [selectedDate, setSelectedDate] = React.useState(new Date())

  let datatoloop = [
    { id: 100, subject: 'math' },
    { id: 101, subject: 'physics' },
    { id: 102, subject: 'chemistry' }
  ]

  const handleChangeSelect = event => {
    setSelectedOptionTest({ [event.target.name]: event.target.value })
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <RadioGroup
            style={{ display: 'flex', flexDirection: 'row' }}
            aria-label="Status"
            name="Status1"
          >
            <FormControlLabel
              value="add_new_employee"
              control={
                <Radio
                  checkedIcon={
                    <Brightness1Icon className={classes.radioChecked} />
                  }
                  icon={<Brightness1Icon className={classes.radioUnchecked} />}
                  classes={{
                    checked: classes.radio,
                    root: classes.root
                  }}
                  checked={selectedOption === 'add_new_employee'}
                  onChange={handleOptionChange}
                />
              }
              label="Add New Employee"
            />
          </RadioGroup>

          <Card
            id="add_new_employee"
            style={{
              display: selectedOption === 'add_new_employee' ? 'block' : 'none'
            }}
          >
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}> ADD EMPLOYEE </h4>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Employee Id"
                    id="employee_id"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email Address"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="UserName"
                    id="userName"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Firstname"
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Middlename"
                    id="middlename"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Lastname"
                    id="lastname"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Address 1"
                    id="address1"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Address 2"
                    id="address2"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="city"> City</InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'city',
                        id: 'city'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'state',
                        id: 'state'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="country"> Country</InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'country',
                        id: 'country'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Zip"
                    id="zip"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="gender"> Gender</InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'gender',
                        id: 'gender'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="dateofbirth"
                        label="Date Of Birth"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="dateofjoining"
                        label="Date Of Joining"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple"> Status</InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'status',
                        id: 'status'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Experience At Joining"
                    id="experience_at_joining"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  {/* work_location */}
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="work_location">
                      {' '}
                      Work Location
                    </InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'work_location',
                        id: 'work_location'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="timezone"> Timezone</InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'timezone',
                        id: 'timezone'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="shift_timing"
                        label="Shift Timing"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="designation">Designation </InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'designation',
                        id: 'designation'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="employment_status">
                      {' '}
                      Employment Status
                    </InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'employment_status',
                        id: 'employment_status'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="userRole"> User Role</InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'userRole',
                        id: 'userRole'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="reporting_manager">
                      Reporting Manager
                    </InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'reporting_manager',
                        id: 'reporting_manager'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="functional_manager">
                      {' '}
                      Functional Manager
                    </InputLabel>
                    <Select
                      value={selectedOptionTest}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: 'functional_manager',
                        id: 'functional_manager'
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {datatoloop.map(item => {
                        return (
                          <MenuItem value={item.id}>{item.subject}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Skills"
                    id="skills"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Certifications"
                    id="certifications"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Achievements"
                    id="achievements"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter>
              <Button color="primary">ADD EMPLOYEE</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
export default Employee
