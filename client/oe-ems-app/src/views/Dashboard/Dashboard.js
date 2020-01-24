import React from "react";
import { Link, Route ,Switch } from 'react-router-dom';
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
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

export default function Dashboard() {
  const classes = useStyles();
  return (
      <Switch>
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <InputLabel className={classes.cardTitle}>Welcome RAKSHANDA</InputLabel>    
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
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
        <GridItem xs={12} sm={12} md={12}> 
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
                            <Link style={{textDecoration:"none" , color:"#FFFFFF"}} to="/admin/user"> Apply Leave </Link>
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
                            <Link style={{textDecoration:"none" , color:"#FFFFFF"}} to="/admin/user"> Apply Work From Home </Link>
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
      </GridContainer>
    </div>
    </Switch>
  );
}
