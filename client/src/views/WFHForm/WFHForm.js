import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
// @material-ui/icons
import BugReport from '@material-ui/icons/BugReport'
import Code from '@material-ui/icons/Code'
import Cloud from '@material-ui/icons/Cloud'
// core components
import UserProfile from '../UserProfile/UserProfile.js'
import Button from '../../components/CustomButtons/Button.js'
import GridItem from '../../components/Grid/GridItem.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import Tasks from '../../components/Tasks/Tasks.js'
import CustomTabs from '../../components/CustomTabs/CustomTabs.js'
import Table from '../../components/Table/Table.js'
import Accordion from '../../components/Accordion/Accordion.js'

import { bugs, website, server } from '../../variables/general.js'

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle.js'

const useStyles = makeStyles(styles)

export default function WFHForm() {
    const classes = useStyles()
    return <div>Work From HOME</div>
}
