import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// core components
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js"

import styles from "../../assets/jss/material-dashboard-react/components/accordionStyle.js";

const useStyles = makeStyles(styles);

export default function Accordion(props) {
    const classes = useStyles();
    const {panelHeading, panelData ,panelFooter } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon style={{color:"#ffffff"}}/>}
            aria-controls="panel1a-content"
            className={classes.heading}
            >
                <h4 className={classes.cardTitleWhite}>
                    {panelHeading}     
                </h4>
            </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CardBody>
            {panelData}
          </CardBody> 
        </ExpansionPanelDetails>
        <CardFooter>
            {panelFooter}
        </CardFooter>
      </ExpansionPanel>
    </div>
)}