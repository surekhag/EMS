import * as Yup from 'yup'

export const formikInitialValues = userToUpdate => {
  return {
    firstname: userToUpdate ? userToUpdate[0].firstname : '',
    lastname: userToUpdate ? userToUpdate[0].lastname : '',
    middlename: userToUpdate ? userToUpdate[0].middlename : '',
    address1: userToUpdate ? userToUpdate[0].address1 : '',
    address2: userToUpdate ? userToUpdate[0].address2 : '',
    city: userToUpdate ? userToUpdate[0].city : '',
    zip: userToUpdate ? userToUpdate[0].zip : '',
    state: userToUpdate ? userToUpdate[0].state : '',
    country: userToUpdate ? userToUpdate[0].country : '',
    gender: userToUpdate ? userToUpdate[0].gender : '',
    dateofbirth: userToUpdate ? userToUpdate[0].dateofbirth : new Date(),
    dateofjoining: userToUpdate ? userToUpdate[0].dateofjoining : new Date(),
    status: userToUpdate ? userToUpdate[0].status : 'Active',
    experience_at_joining: userToUpdate
      ? userToUpdate[0].experience_at_joining
      : '',
    work_location: userToUpdate ? userToUpdate[0].work_location : '',
    timezone: userToUpdate ? userToUpdate[0].timezone : '',
    shift_timing: userToUpdate ? userToUpdate[0].shift_timing : '',
    designation: userToUpdate ? userToUpdate[0].designation : '',
    employment_status: userToUpdate ? userToUpdate[0].employment_status : '',
    userRole: userToUpdate ? userToUpdate[0].userRole : '',
    reporting_manager: userToUpdate ? userToUpdate[0].reporting_manager : '',
    skills: userToUpdate ? userToUpdate[0].skills : '',
    certifications: userToUpdate ? userToUpdate[0].certifications : '',
    achievements: userToUpdate ? userToUpdate[0].achievements : '',
    contact_no: userToUpdate ? userToUpdate[0].contact_no : ''
  }
}

export const formikInitialValuesAddUser = {
  employee_id: '',
  email: '',
  userName: '',
  password: ''
}
export const formikAddNewUserValidations = Yup.object().shape({
  employee_id: Yup.number()
    .typeError('Employee Id must be a number')
    .required('Employee Id is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email'),
  userName: Yup.string()
    .min(8, 'UserName must be at least 8 characters long!')
    .required('UserName is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long!')
    .required('Password is required')
})

export const formikUpdateValidations = Yup.object().shape({
  firstname: Yup.string()
    .required('Firstname is required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  lastname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Lastname is required'),
  middlename: Yup.string().required('Middlename is required'),
  contact_no: Yup.number()
    .typeError("Doesn't seems valid Contact Number")
    .required('Contact Number is required')
    .positive()
    .integer("A phone number can't include a decimal point")
    .min(10, 'Enter valid valid Contact number of min 10 digits!'),
  //  .max(12, 'Enter max valid Contact number!'),
  //  .min( () => ({ key: 'field_too_short', values:  10 })),
  //    .max (() => ({ key: 'field_too_big', values: 12 })),
  address1: Yup.string()
    .min(2, 'Too Short!')
    .required('Address1 is required'),
  city: Yup.string().required('City is required'),
  zip: Yup.string()
    .min(6, 'Invalid Zip Code')
    .required('Zip is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  gender: Yup.string().required('Gender is required'),
  dateofbirth: Yup.date('Invalid date')
    .required('Date Of Birth is required')
    .typeError('')
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
  dateofjoining: Yup.date('Invalid date')
    .typeError('')
    .test('', 'Enter valid date', function(value) {
      const date = new Date()
      return value.getFullYear() - date.getFullYear() < 2
    })
    .required('Date Of Joining is required'),
  status: Yup.string().required('Status is required'),
  experience_at_joining: Yup.number()
    .typeError('Experience must be in numbers')
    .required('Experience At Joining is required'),
  work_location: Yup.string().required('Work Location is required'),
  timezone: Yup.string().required('Timezone is required'),
  shift_timing: Yup.string().required('Shift Timing is required'),
  designation: Yup.string().required('Designation is required'),
  employment_status: Yup.string().required('Employment Status is required'),
  userRole: Yup.string().required('User Role is required'),
  reporting_manager: Yup.string().required('Reporting Manager is required'),
  skills: Yup.string().required('Skills are required')
})
