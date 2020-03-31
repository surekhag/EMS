import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import Card from '../Card/Card'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import Button from '../CustomButtons/Button'
import { loadAllEmployeeData } from '../../actions/employeeAction'
import Input from '../FromComponents/Input'

import { loadAllProjects } from '../../actions/projectAction'

// import Grid from '@material-ui/core/Grid'
import { projectSelector } from '../../selectors/projectSelectors'
import 'date-fns'
import { managerDataSelector } from '../../selectors/employeeSelectors'
import { loadManagers } from '../../actions/employeeAction'
import MenuItem from '@material-ui/core/MenuItem'
import SelectMenu from '../FromComponents/SelectMenu'

import DatePicker from '../../components/FromComponents/DatePicker'
import { useToasts } from 'react-toast-notifications'
import { Formik, Form } from 'formik'
import { projectStyles } from './styles'
import { useSelector, useDispatch } from 'react-redux'
import {
  allocateProject,
  updateProjectAllocation,
  addNewProject,
  clearProjectMsg,
  updateProject
} from '../../actions/projectAction'
import * as Yup from 'yup'
import {
  addProjectError,
  addNewProjectStatusMsg,
  updateProjectStatusMsg,
  updateProjectErrorMsg
} from '../../selectors/projectSelectors'
import { yupRequired, yupRequiredDate } from '../../helpers/yupValidations'

import { employeeDataSelector } from '../../selectors/employeeSelectors'
const styles = projectStyles
const useStyles = makeStyles(styles)
const Project = props => {
  const { setPageView, projectToUpdate } = props

  const projects = useSelector(projectSelector)
  const employeeData = useSelector(employeeDataSelector)
  const [managers, setManagers] = useState(null)
  const [activeEmployees, setEmployeeData] = useState(null)
  const classes = useStyles()
  const { addToast } = useToasts()
  const dispatch = useDispatch()

  const error = useSelector(addProjectError)
  const addNewProjectStatus = useSelector(addNewProjectStatusMsg)
  const updateProjectStatus = useSelector(updateProjectStatusMsg)
  const updateProjectError = useSelector(updateProjectErrorMsg)

  const managerdata = useSelector(managerDataSelector)

  const projectForm = useRef(null)

  useEffect(() => {
    dispatch(loadAllEmployeeData())
    dispatch(loadAllProjects())
    dispatch(loadManagers())
  }, [dispatch])

  useEffect(() => {
    if (managerdata) {
      const emp = managerdata
      const managers = emp.filter(item => {
        if (item.userRole === 'manager' && item.status === 'Active') return item
      })

      setManagers(managers)
    }
  }, [managerdata])

  useEffect(() => {
    if (employeeData) {
      const activeEmployees = employeeData.filter(item => {
        if (item.status === 'Active') {
          return item
        }
      })
      console.log(employeeData, activeEmployees)
      setEmployeeData(activeEmployees)
    }
  }, [employeeData])

  useEffect(() => {
    if (addNewProjectStatus) {
      addToast(addNewProjectStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      projectForm.current.reset()
      dispatch(clearProjectMsg())
      setPageView('projectListing')
    }
  }, [addNewProjectStatus, addToast, dispatch])

  useEffect(() => {
    if (updateProjectStatus) {
      addToast(updateProjectStatus, {
        appearance: 'success',
        autoDismiss: true
      })
      projectForm.current.reset()
      dispatch(clearProjectMsg())
      if (props) props.setUpdateAction()
    }
  }, [updateProjectStatus, addToast, dispatch])

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: 'error', autoDismiss: true })
      dispatch(clearProjectMsg())
    }
  }, [error, addToast, dispatch])

  useEffect(() => {
    if (updateProjectError) {
      addToast(updateProjectError, { appearance: 'error', autoDismiss: true })
      dispatch(clearProjectMsg())
    }
  }, [updateProjectError, addToast, dispatch])

  const submitFormValues = values => {
    dispatch(
      projectToUpdate
        ? updateProjectAllocation(values, projectToUpdate[0]._id)
        : allocateProject(values)
    )
  }

  let initialValues
  const {
    project_id,
    employee_id,
    startdate = new Date(),
    enddate = new Date(),
    status = 'Active',
    manager_employee_id
  } = projectToUpdate ? projectToUpdate[0] : {}

  initialValues = {
    project_id,
    employee_id,
    startdate,
    enddate,
    status,
    manager_employee_id
  }
  const handleProjectListView = () => {
    props.setUpdateAction()
  }

  const projectDataValidation = Yup.object().shape({
    project_id: yupRequired('Project'),
    employee_id: yupRequired('Employee'),
    manager_employee_id: yupRequired('Manager'),
    startdate: yupRequiredDate('Start Date').typeError(''),
    enddate: yupRequiredDate('End Date')
      .typeError('')
      .test('', 'Must be greater than Start Date', function(value) {
        const startdate = this.parent.startdate
        return value > startdate
      })
  })

  return (
    <GridContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          submitFormValues(values)
          setSubmitting(false)
        }}
        validationSchema={projectDataValidation}
      >
        {({ isSubmitting, values, setFieldValue, handleChange }) => (
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <Form ref={projectForm}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    {projectToUpdate
                      ? 'UPDATE PROJECT ALLOCATION'
                      : 'ALLOCATE PROJECT'}
                  </h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="employee_id"
                        onChange={handleChange}
                        disabledName="None"
                        label={'Employee *'}
                        value={values.employee_id}
                      >
                        {activeEmployees
                          ? activeEmployees.map(item => {
                              return (
                                <MenuItem value={item.employee_id}>
                                  {item.firstname + ' ' + item.lastname}
                                </MenuItem>
                              )
                            })
                          : null}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <SelectMenu
                        name="project_id"
                        onChange={handleChange}
                        disabledName="Select Project"
                        label={'Project *'}
                        value={values.project_id}
                      >
                        {projects
                          ? projects.map((item, key) => {
                              return (
                                <MenuItem
                                  // className={classes.hoverEffect}
                                  value={item._id}
                                  // key={key}
                                >
                                  {item.title}
                                </MenuItem>
                              )
                            })
                          : null}
                      </SelectMenu>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <DatePicker
                        name="startdate"
                        value={values.startdate}
                        label="Start Date *"
                        onChange={date => setFieldValue('startdate', date)}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <DatePicker
                        name="enddate"
                        value={values.enddate}
                        label="End Date *"
                        onChange={date => setFieldValue('enddate', date)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <SelectMenu
                        name="manager_employee_id"
                        onChange={handleChange}
                        disabledName="None"
                        label={'Reporting Manager *'}
                        value={values.manager_employee_id}
                      >
                        {managers
                          ? managers.map(item => {
                              return (
                                <MenuItem value={item.employee_id}>
                                  {item.firstname + ' ' + item.lastname}
                                </MenuItem>
                              )
                            })
                          : null}
                      </SelectMenu>
                    </GridItem>
                  </GridContainer>
                </CardBody>

                <CardFooter>
                  {projectToUpdate ? (
                    <>
                      <GridItem xs={12} sm={12} md={6}>
                        <Button
                          id="update"
                          type="submit"
                          color="primary"
                          disabled={isSubmitting}
                        >
                          UPDATE PROJECT ALLOCATION
                        </Button>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          onClick={handleProjectListView}
                        >
                          cancel
                        </Button>
                      </GridItem>
                    </>
                  ) : (
                    <Button
                      id="add"
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      ALLOCATE PROJECT
                    </Button>
                  )}
                </CardFooter>
              </Form>
            </Card>
          </GridItem>
        )}
      </Formik>
    </GridContainer>
  )
}
export default Project
