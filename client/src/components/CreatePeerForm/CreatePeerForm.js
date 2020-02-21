import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

import DateFnsUtils from '@date-io/date-fns'
import { Formik, Form } from 'formik'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import {createPeerReview} from '../../actions/peerReviewAction'

// core components
import checkboxAdnRadioStyle from '../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js'
import Grid from '@material-ui/core/Grid'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Button from '../../components/CustomButtons/Button.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'
import { useSelector , useDispatch} from 'react-redux'

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
    container: {
        marginTop: '27px'
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    },
    formControl: {
        margin: 11,
        minWidth: 200
    },
    marginTop: {
        margin: '0px'
    }
}

const useStyles = makeStyles(styles)

const CreatePeerForm = () => {
    const classes = useStyles()
    const employeeData = useSelector(state => state.EmployeeInfo.employeeData)
    const projects = useSelector(state=>state.projectReducer.projects)
    const dispatch = useDispatch();
    const sapmle = (values) => {
        dispatch(createPeerReview(values));
        console.log(values);
    }
    return (
        <Grid>
            <Formik
                initialValues={{
                    employee_under_review: '',
                    employee_reviewing: '',
                    project: '',
                    from_date: new Date(),
                    to_date: new Date(),
                    due_from: new Date(),
                    due_to: new Date(),
                    review_form_link: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    sapmle(values)
                    setSubmitting(false)
                }}
            >
                {({ isSubmitting, values, setFieldValue, handleChange }) => (
                    <Card>
                        <Form>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>
                                    CREATE PEER FORM
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <Grid className={classes.container} container>
                                    <Grid
                                        xs={6}
                                        sm={6}
                                        md={3}
                                        className={classes.grid}
                                        item
                                    >
                                        Employee Under Review
                                    </Grid>
                                    <Grid xs={6} sm={6} md={3} item>
                                        <FormControl
                                            className={classes.formControl}
                                        >
                                            <Select
                                                name="employee_under_review"
                                                onChange={handleChange}
                                                value={values.employee_under_review}
                                                displayEmpty
                                            >
                                                <MenuItem
                                                    value=""
                                                    key={-1}
                                                    disabled
                                                >
                                                    Select Employee
                                                </MenuItem>
                                                {employeeData
                                                    ? employeeData.data.data.map(
                                                          (prop, key) => {
                                                              return prop.status !==
                                                                  'Inactive' ? (
                                                                  <MenuItem
                                                                      value={
                                                                          prop.userName
                                                                      }
                                                                      key={key}
                                                                  >
                                                                      {
                                                                          prop.userName
                                                                      }
                                                                  </MenuItem>
                                                              ) : null
                                                          }
                                                      )
                                                    : null}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        xs={6}
                                        sm={6}
                                        md={3}
                                        className={classes.grid}
                                        item
                                    >
                                        Employee Reviewing
                                    </Grid>
                                    <Grid xs={6} sm={6} md={3} item>
                                        <FormControl
                                            className={classes.formControl}
                                        >
                                            <Select
                                                name="employee_reviewing"
                                                onChange={handleChange}
                                                value={values.employee_reviewing}
                                                displayEmpty
                                            >
                                                <MenuItem
                                                    value=""
                                                    key={-1}
                                                    disabled
                                                >
                                                    Select Employee
                                                </MenuItem>
                                                {employeeData
                                                    ? employeeData.data.data.map(
                                                          (prop, key) => {
                                                              return prop.status !==
                                                                  'Inactive' ? (
                                                                  <MenuItem
                                                                      value={
                                                                          prop.userName
                                                                      }
                                                                      key={key}
                                                                  >
                                                                      {
                                                                          prop.userName
                                                                      }
                                                                  </MenuItem>
                                                              ) : null
                                                          }
                                                      )
                                                    : null}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid className={classes.container} container>
                                    <Grid
                                        xs={6}
                                        sm={6}
                                        md={3}
                                        className={classes.grid}
                                        item
                                    >
                                        Project
                                    </Grid>
                                    <Grid xs={6} sm={6} md={3} item>
                                        <FormControl
                                            className={classes.formControl}
                                        >
                                            <Select
                                                name="project"
                                                onChange={handleChange}
                                                value={values.project}
                                                displayEmpty
                                            >
                                                <MenuItem
                                                    value=""
                                                    key={-1}
                                                    disabled
                                                >
                                                    Select Project
                                                </MenuItem>
                                                {projects
                                                    ? projects.map(
                                                          (prop, key) => {
                                                              return (
                                                                  <MenuItem
                                                                      value={
                                                                          prop.title
                                                                      }
                                                                      key={key}
                                                                  >
                                                                      {
                                                                          prop.title
                                                                      }
                                                                  </MenuItem>
                                                              ) 
                                                          }
                                                      )
                                                    : null}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid className={classes.container} container>
                                    <Grid
                                        xs={6}
                                        sm={6}
                                        md={3}
                                        className={classes.grid}
                                        item
                                    >
                                        Review From Date
                                    </Grid>
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <Grid xs={6} sm={6} md={3} item>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                name="from_date"
                                                margin="normal"
                                                label="Date picker inline"
                                                value={values.from_date}
                                                onChange={date =>
                                                    setFieldValue(
                                                        'from_date',
                                                        date
                                                    )
                                                }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date'
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <Grid
                                        xs={6}
                                        sm={6}
                                        md={3}
                                        className={classes.grid}
                                        item
                                    >
                                        Review To Date
                                    </Grid>
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <Grid xs={6} sm={6} md={3} item>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                name="to_date"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                label="Date picker inline"
                                                value={values.to_date}
                                                onChange={date =>
                                                    setFieldValue(
                                                        'to_date',
                                                        date
                                                    )
                                                }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date'
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid className={classes.container} container>
                                    <Grid
                                        xs={6}
                                        sm={6}
                                        md={3}
                                        className={classes.grid}
                                        item
                                    >
                                        Due From Date
                                    </Grid>
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <Grid xs={6} sm={6} md={3} item>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                name="due_from"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                label="Date picker inline"
                                                value={values.due_from}
                                                onChange={date =>
                                                    setFieldValue(
                                                        'due_from',
                                                        date
                                                    )
                                                }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date'
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <Grid
                                        xs={6}
                                        sm={6}
                                        md={3}
                                        className={classes.grid}
                                        item
                                    >
                                        Due To Date
                                    </Grid>
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <Grid xs={6} sm={6} md={3} item>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                name="due_to"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                label="Date picker inline"
                                                value={values.due_to}
                                                onChange={date =>
                                                    setFieldValue(
                                                        'due_to',
                                                        date
                                                    )
                                                }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date'
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid className={classes.container} container>
                                    <Grid
                                        xs={6}
                                        sm={6}
                                        md={3}
                                        className={classes.grid}
                                        item
                                    >
                                        Google Form Link
                                    </Grid>
                                    <Grid xs={6} sm={6} md={3} item>
                                        <CustomInput
                                            labelText="Link"
                                            id="review_form_link"
                                            formControlProps={{
                                                fullWidth: true,
                                                className: classes.marginTop
                                            }}
                                            inputProps={{
                                                value: values.review_form_link,
                                                name: 'review_form_link',
                                                onChange: handleChange,
                                                required : true
                                            }}
                                        ></CustomInput>
                                    </Grid>
                                </Grid>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    type="submit"
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    CREATE PEER
                                </Button>
                            </CardFooter>
                        </Form>
                    </Card>
                )}
            </Formik>
        </Grid>
    )
}

export default CreatePeerForm
