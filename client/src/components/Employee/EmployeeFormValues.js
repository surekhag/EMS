import * as Yup from 'yup'

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
  } = userToUpdate ? userToUpdate[0] : {}
  return {
    firstname: userToUpdate ? firstname : '',
    lastname: userToUpdate ? lastname : '',
    middlename: userToUpdate ? middlename : '',
    address1: userToUpdate ? address1 : '',
    address2: userToUpdate ? address2 : '',
    city: userToUpdate ? city : '',
    zip: userToUpdate ? zip : '',
    state: userToUpdate ? state : '',
    country: userToUpdate ? country : '',
    gender: userToUpdate ? gender : '',
    dateofbirth: userToUpdate ? dateofbirth : new Date(),
    dateofjoining: userToUpdate ? dateofjoining : new Date(),
    status: userToUpdate ? status : 'Active',
    experience_at_joining: userToUpdate ? experience_at_joining : '',
    work_location: userToUpdate ? work_location : '',
    timezone: userToUpdate ? timezone : '',
    shift_timing: userToUpdate ? shift_timing : '',
    designation: userToUpdate ? designation : '',
    employment_status: userToUpdate ? employment_status : '',
    userRole: userToUpdate ? userRole : '',
    reporting_manager: userToUpdate ? reporting_manager : '',
    skills: userToUpdate ? skills : '',
    certifications: userToUpdate ? certifications : '',
    achievements: userToUpdate ? achievements : '',
    contact_no: userToUpdate ? contact_no : ''
  }
}

export const formikInitialValuesAddUser = {
  employee_id: '',
  email: '',
  userName: '',
  password: ''
}

const yupRequired = text => {
  return Yup.string().required(`${text} is required`)
}
const yupRequiredNumber = text => {
  return Yup.number().required(`${text} is required`)
}
const yupRequiredDate = text => {
  return Yup.date().required(`${text} is required`)
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
  middlename: yupRequired('Middlename')
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
      const dt1 = value
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
  reporting_manager: yupRequired('Reporting Manager'),
  skills: yupRequired('Skill')
})
