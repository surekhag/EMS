import * as Yup from 'yup'
import {
  yupRequired,
  yupRequiredNumber,
  yupRequiredDate
} from '../../helpers/yupValidations'
export const formikInitialValues = userToUpdate => {
  const {
    firstname,
    lastname,
    middlename,
    address1,
    address2,
    city,
    zip,
    state,
    country,
    gender,
    dateofbirth = new Date(),
    dateofjoining = new Date(),
    status = 'Active',
    experience_at_joining,
    work_location,
    timezone,
    shift_timing,
    designation,
    employment_status,
    userRole,
    reporting_manager,
    skills,
    certifications,
    achievements,
    contact_no
  } = userToUpdate ? userToUpdate[0] : {}
  return {
    firstname,
    lastname,
    middlename,
    address1,
    address2,
    city,
    zip,
    state,
    country,
    gender,
    dateofbirth,
    dateofjoining,
    status,
    experience_at_joining,
    work_location,
    timezone,
    shift_timing,
    designation,
    employment_status,
    userRole,
    reporting_manager,
    skills,
    certifications,
    achievements,
    contact_no
  }
}

export const formikInitialValuesAddUser = {
  employee_id: '',
  email: '',
  userName: '',
  password: ''
}

export const formikAddNewUserValidations = Yup.object().shape({
  employee_id: yupRequiredNumber('Employee Id').typeError(
    'Employee Id must be a number'
  ),
  email: yupRequired('Email Id').email('Invalid email'),
  userName: yupRequired('UserName').min(
    8,
    'UserName must be at least 8 characters long!'
  ),
  password: yupRequired('Password').min(
    8,
    'Password must be at least 8 characters long!'
  )
})

export const formikUpdateValidations = Yup.object().shape({
  firstname: yupRequired('Firstname')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  lastname: yupRequired('Lastname')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  contact_no: yupRequiredNumber('Contact Number')
    .typeError("Doesn't seems valid Contact Number")
    .positive()
    .integer("A phone number can't include a decimal point")
    .min(10, 'Enter valid valid Contact number of min 10 digits!'),
  address1: yupRequired('Address1').min(2, 'Too Short!'),
  city: yupRequired('City'),
  zip: yupRequired('Zip').min(6, 'Enter minimum 6 length Zip Code'),
  state: yupRequired('State'),
  country: yupRequired('Country'),
  gender: yupRequired('Gender'),
  dateofbirth: yupRequiredDate('Date Of Birth')
    .typeError('Invalid date')
    .test('', 'Enter valid date', function(value) {
      const date = new Date()
      return value < date
    })
    .test('', 'Age must be greater than 18', function(value) {
      const date = new Date()
      const result = Math.floor(
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
          Date.UTC(value.getFullYear(), value.getMonth(), value.getDate())) /
          (1000 * 60 * 60 * 24)
      )
      return Math.floor(result / 30 / 12) > 17
    }),
  dateofjoining: yupRequiredDate('Date Of Joining')
    .typeError('Invalid Date')
    .test('', 'Enter valid date', function(value) {
      const date = new Date()
      return value.getFullYear() - date.getFullYear() < 2
    }),
  status: yupRequired('Status is required'),
  experience_at_joining: yupRequiredNumber('Experience At Joining').typeError(
    'Experience must be in numbers'
  ),
  work_location: yupRequired('Work Location'),
  timezone: yupRequired('Timezone'),
  shift_timing: yupRequired('Shift Timing'),
  designation: yupRequired('Designation'),
  employment_status: yupRequired('Employment Status'),
  userRole: yupRequired('User Role'),
  reporting_manager: Yup.string().when('designation', {
    is: designation =>
      designation !== 'Partner' && designation !== 'Chief Executive Officer',
    then: yupRequired('Reporting Manager')
  }),
  skills: yupRequired('Skill')
})
