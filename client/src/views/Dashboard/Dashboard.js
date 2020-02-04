import React , { useState , useEffect } from "react";
import { Link, Route ,Switch } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux'
import {loadAllStatesData} from '../../actions';
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input"
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
// @material-ui/icons
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import UserProfile from "../UserProfile/UserProfile.js";
import Button from "../../components/CustomButtons/Button.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Tasks from "../../components/Tasks/Tasks.js";
import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
import Table from "../../components/Table/Table.js";
import Accordion from "../../components/Accordion/Accordion.js"

import { bugs, website, server } from "../../variables/general.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

  const useStyles = makeStyles(styles);
  const Dashboard=(props)=>{
    const classes = useStyles();
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [multipleStatesName, setMultipleStatesName] = useState([]);
    const dispatch = useDispatch();
    const StatesData = useSelector(state => state.StateInfo.StateSelectData);
    const loadAllStates =() => { dispatch(loadAllStatesData())}
    useEffect(() => {
      loadAllStates();
    },[]);
    const handleChange =(e)=>{
      if(e.target.name === "SelectState"){
        setSelectedState(e.target.value);
      }
      else if(e.target.name === "selectCity"){
        setSelectedCity(e.target.value);
      }
      else
        setMultipleStatesName(e.target.value);
    }
    
    
  return (
      <Switch>
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <InputLabel className={classes.cardTitle}>Welcome RAKSHANDA</InputLabel>    
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
            <Accordion panelHeading="Allowcated Projects"
                    panelData={<Table
                    tableHeaderColor="gray"
                    tableHead={["Project Name", "Current Allocation", "Project Manager"]}
                    tableData={[
                        ["GreenBall", "50%", "Mayur Shetye"],
                        ["React Training", "50%", "Kaustubh Umalkar"],
                        ["GreenBall", "50%", "Mayur Shetye"],
                        ["React Training", "50%", "Kaustubh Umalkar"]
                    ]}
                    showLink={false}
                />}
                    panelFooter={
                        <>
                        <Button color="success" size="sm">
                        <Link style={{textDecoration:"none" , color:"#FFFFFF"}} to="/admin/user"> My Privious Projects </Link>
                        </Button>
                        <Route path="/admin/user" component={UserProfile} />
                        </>
                    }>
                     
                </Accordion>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}> 
            <Accordion panelHeading="Leave Summary"
                        panelData={<Table
                        tableHeaderColor="gray"
                        tableHead={["Month", "Leave Taken", "Leave Balance"]}
                        tableData={[
                            ["January","1", "1"],
                            ["February", "2", "2"],
                            ["March", "3", "3"],
                            ["April", "0", "4"],
                            ["May", "0", "5"],
                            ["June", "0", "4"],
                            ["July", "0", "3"],
                            ["August", "0", "5"],
                            ["September", "0", "6"],
                            ["October", "0", "7"],
                            ["November", "1", "8"],
                            ["December", "2", "9"]
                        ]}
                        showLink={false}
                    />}
                        panelFooter={
                            <>
                            <Button color="success" size="sm">
                            <Link style={{textDecoration:"none" , color:"#FFFFFF"}} to="/admin/LeaveForm"> Apply Leave </Link>
                            </Button>
                            <Route path="/admin/user" component={UserProfile} />
                            </>
                        }>   
            </Accordion>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}> 
            <Accordion panelHeading="Attendence Log"
                        panelData={<><InputLabel>Current Week Attendence</InputLabel> 
                        <Table
                        tableHeaderColor="gray"
                        tableHead={["Sun", "Mon", "Tue","Wed","Thu","Fri","Sat"]}
                        tableData={[
                            ["0","8", "8","8","8","8","0"],
                            [<input></input>,<input></input>,<input></input>,<input></input>,<input></input>,<input></input>,<input></input>]
                        ]}
                        showLink={false}
                    /></>}
                        panelFooter={
                            <>
                            <Button color="success" size="sm">
                            <Link style={{textDecoration:"none" , color:"#FFFFFF"}} to="/admin/WFHForm"> Apply Work From Home </Link>
                            </Button>
                            <Route path="/admin/user" component={UserProfile} />
                            </>
                        }>
            </Accordion>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <FormControl >
          <InputLabel>State</InputLabel>
            <Select
              name="SelectState"
              onChange={handleChange}
              value={selectedState}
            >
            <MenuItem value="" key={-1} disabled>Choose State</MenuItem>
            {StatesData ? Object.keys(StatesData.data).map((prop, key) => {
            return (
              <MenuItem value={prop} key={key}>{prop}</MenuItem>
            );
            }):null}
          </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <FormControl >
          <InputLabel>City</InputLabel>
          <Select
            name="selectCity"
            value={selectedCity}
            onChange={handleChange}
          >
            <MenuItem value="" key={-1} disabled>Choose City</MenuItem>
            {selectedState ? StatesData.data[selectedState].map((prop, key) => {
            return (
              <MenuItem value={prop} key={key}>{prop}</MenuItem>
            );
            }):null}
          </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}> 
          <FormControl >
            <InputLabel>States</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={multipleStatesName}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {StatesData ? Object.keys(StatesData.data).map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              )):null}
            </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
        </GridItem>
      </GridContainer>
    </div>
    </Switch>
  );
}
export default Dashboard;
