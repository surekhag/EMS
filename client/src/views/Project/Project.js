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
import Select from 'react-select'
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
const Project = ()=>{
    const classes = useStyles();
    const [addNewProject, setAddNewProject] = useState("block");
    const [editProject, setEditProject] = useState("none");
    const [deleteProject, setDeleteProject] = useState("none");
    const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

const technologies= [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

// ['React', 'OCC', 'OSF', 'Middleware','AI'];
return(
    <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
    {/* <span>Projects data</span> */}
    <Card>
        <CardBody>
    <Button color="primary">Add New Project</Button>
    <Button color="primary">Edit Project</Button>
    <Button color="primary">Delete Project</Button>

    {/* <InputLabel style={{ color: '#AAAAAA' }}>
                                        Status
                                    </InputLabel> */}
                                    <RadioGroup style ={{display: "flex", flexDirection : "row"}}
                                        aria-label="Status"
                                        name="Status1"
                                    >
                                        <FormControlLabel
                                            value="add_new_project"
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
                                                />
                                            }
                                            label="Add New Project"
                                        />
                                        <FormControlLabel
                                            value="update_project"
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
                                                />
                                            }
                                            label="Update Project"
                                        />
                                          <FormControlLabel
                                            value="delete_project"
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
                                                />
                                            }
                                            label="Delete Project"
                                        />
                                    </RadioGroup>

    </CardBody>
    </Card>
    
    
    <Card id="addNewProject" style ={{display : addNewProject}}>
    <CardHeader color="primary">
    <h4 className={"test"}>Add New Project </h4>
    {/* <p className={"test"}> Complete your profile     </p> */}
    </CardHeader>
        <CardBody>
        <GridContainer>
        
        <GridItem xs={12} sm={12} md={6}>
        <CustomInput
            labelText="Project Title"
            id="title"
            formControlProps={{
                fullWidth: true
            }}
        />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
         <CustomInput
            labelText="Description"
            id="description"
            formControlProps={{
                fullWidth: true
            }}           
        />
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={6}>
        <CustomInput
            labelText="Technology"
            id="technology"
            formControlProps={{
                fullWidth: true
            }}
        />
        </GridItem> */}       

        <GridItem xs={12} sm={12} md={6}>
        <CustomInput
            labelText="Client"
            id="client"
            formControlProps={{
                fullWidth: true
            }}
        />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
        <CustomInput
            labelText="Client Location"
            id="client"
            formControlProps={{
                fullWidth: true
            }}
        />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
        <InputLabel
            htmlFor="simple-select"
            className={classes.selectLabel}
          >
            Technology
          </InputLabel>
        <Select multiple={true} label="Technology" options={technologies}>
            {/* <option>React</option> */}
            {/* {technologies} */}
            </Select>
        </GridItem>
        
        <GridItem xs={12} sm={12} md={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="start_date"
          label="Start Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        </GridItem>
        

        <GridItem xs={12} sm={12} md={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="end_date"
          label="End Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        </GridItem>

       
        <GridItem xs={12} sm={12} md={6}>
                                    <InputLabel style={{ color: '#AAAAAA' }}>
                                        Status
                                    </InputLabel>
                                    <RadioGroup style ={{display: "flex", flexDirection : "row"}}
                                        aria-label="Status"
                                        name="Status1"
                                    >
                                        <FormControlLabel
                                            value="active"
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
                                                />
                                            }
                                            label="Active"
                                        />
                                        <FormControlLabel
                                            value="Inactive"
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
                                                />
                                            }
                                            label="Inactive"
                                        />
                                    </RadioGroup>



                                </GridItem>



       
        <GridItem xs={12} sm={12} md={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="created_date"
          label="Created Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        </GridItem>       
        
        <GridItem xs={12} sm={12} md={3}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Updated Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
        <CustomInput
            labelText="Created By"
            id="created_by"
            formControlProps={{
                fullWidth: true
            }}
        />
        </GridItem>


        <GridItem xs={12} sm={12} md={6}>
        <CustomInput
            labelText="Last Updated By"
            id="last_updated_by"
            formControlProps={{
                fullWidth: true
            }}
        />
        </GridItem>
        

        {/* <GridItem xs={12} sm={12} md={12}>
        <CustomInput
        labelText="Description"
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
        */}
 


          {/* title  : req.body.title,
          description  : req.body.description,
          startdate : req.body.startdate,
          enddate : req.body.enddate,
          technology : req.body.technology,
          client : req.body.client,
          client_location : req.body.client_location ,
          status : req.body.status,
          type : req.body.type,
          created_date : req.body.created_date ,
          created_by : req.body.created_by,
          updated_date : req.body.updated_date,
          last_updated_by : req.body.last_updated_by, */}


        
        </GridContainer>

        </CardBody>
        <CardFooter><Button color="primary">Add Project</Button></CardFooter>
        
    </Card>
    <Card id="editProject" style ={{display : editProject}}>
    <CardHeader color="primary">
    <h4 className={"test"}>Edit Project </h4>
    </CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter><Button color="primary">Add Project</Button></CardFooter>
        
    </Card>

    <Card id="deleteProject" style ={{display : deleteProject}}>
    <CardHeader color="primary">
    <h4 className={"test"}>Delete Project </h4>
    </CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter><Button color="primary">Add Project</Button></CardFooter>
        
    </Card>
    </GridItem>
    </GridContainer>
    </div>
)
}
export default Project;