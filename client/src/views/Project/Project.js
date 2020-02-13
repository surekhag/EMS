import React, {useState} from 'react';
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardAvatar from '../../components/Card/CardAvatar.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import Button from '../../components/CustomButtons/Button.js'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Select from "@material-ui/core/Select";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

const Project = ()=>{
    const [addNewProject, setAddNewProject] = useState("block");
    const [editProject, setEditProject] = useState("none");
    const [deleteProject, setDeleteProject] = useState("none");


    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };


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
        <GridItem xs={12} sm={12} md={12}>
        <CustomInput
        labelText="About me"
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

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
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
        </Grid>
        </MuiPickersUtilsProvider>


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