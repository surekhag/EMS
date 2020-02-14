import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardAvatar from '../../components/Card/CardAvatar.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Button from '../../components/CustomButtons/Button.js'
import CustomInput from '../../components/CustomInput/CustomInput.js'
// import Select from "@material-ui/core/Select";
// import Select from 'react-select'
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid';
import { Radio, RadioGroup } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js'

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
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
    }
}
const useStyles = makeStyles(styles);
const Employee = ()=>{
const classes = useStyles();
const [selectedOption, setSelectedOption] = useState('add_new_employee');

const handleOptionChange =(event)=>{    
    setSelectedOption(event.target.value);
}

return (
    <div>
<GridContainer>
<GridItem xs={12} sm={12} md={12}>
{/* <Card> */}
{/* <CardBody> */}
<RadioGroup style ={{display: "flex", flexDirection : "row"}}
                                        aria-label="Status"
                                        name="Status1"
                                    >
<FormControlLabel
    value="add_new_employee"
    control={
        <Radio
            checkedIcon={
                <Brightness1Icon
                    className={
                        classes.radioChecked
                    }
                />
            }
            icon={
                <Brightness1Icon
                    className={
                        classes.radioUnchecked
                    }
                />
            }
            classes={{
                checked: classes.radio,
                root: classes.root
            }}
            checked ={selectedOption === "add_new_employee"}
            onChange ={handleOptionChange}
        />
    }
    label="Add New Employee"
/>
<FormControlLabel
    value="update_employee"
    control={
        <Radio
            checkedIcon={
                <Brightness1Icon
                    className={
                        classes.radioChecked
                    }
                />
            }
            icon={
                <Brightness1Icon
                    className={
                        classes.radioUnchecked
                    }
                />
            }
            classes={{
                checked: classes.radio,
                root: classes.root
            }}
            checked ={selectedOption === "update_employee"}
            onChange ={handleOptionChange}
        />
    }
    label="Update Employee"
/>
    <FormControlLabel
    value="delete_employee"
    control={
        <Radio
            checkedIcon={
                <Brightness1Icon
                    className={
                        classes.radioChecked
                    }
                />
            }
            icon={
                <Brightness1Icon
                    className={
                        classes.radioUnchecked
                    }
                />
            }
            classes={{
                checked: classes.radio,
                root: classes.root
            }}
            checked ={selectedOption === "delete_employee"}
            onChange ={handleOptionChange}
        />
    }
    label="Delete Employee"
/>
</RadioGroup>
{/* </CardBody> */}
{/* </Card> */}
<Card id="add_new_employee" style={{display : selectedOption =="add_new_employee"? 'block': 'none' }}>
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
 <GridItem xs={12} sm={12} md={6}> 
 city
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 <CustomInput
            labelText="Zip"
            id="zip"
            formControlProps={{
                fullWidth: true
            }}
        />
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 state
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 country
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 gender
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 dateofbirth
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 dateofjoining
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 status
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 experience_at_joining
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 work_location
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 timezone
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 shift_timing
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 designation
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 employment_status
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 userRole
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 reporting_manager
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 functional_manager
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 skills
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 certifications
 </GridItem>
 <GridItem xs={12} sm={12} md={6}> 
 achievements
 </GridItem>

</GridContainer>
 </CardBody>
 
 <CardFooter>
 <Button color="primary">ADD EMPLOYEE</Button>
 </CardFooter>
    
</Card>
<Card id="update_employee" style={{display : selectedOption =="update_employee"? 'block': 'none' }}>
    <CardBody>
    Update Employee
    </CardBody>
</Card>
<Card id="delete_employee" style={{display : selectedOption =="delete_employee"? 'block': 'none' }}>
    <CardBody>
    del
    </CardBody>
</Card>

</GridItem>
</GridContainer>
    </div>
    )
}

export default Employee;