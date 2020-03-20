import * as Yup from 'yup'

const validationSchema = {
  employee_under_review: Yup.string().required('Required'),
  review_form_link: Yup.string().required('Required'),
  employee_reviewing: Yup.string()
    .notOneOf(
      [Yup.ref('employee_under_review'), null],
      'Employee under review must not equal to Employee reviewing'
    )
    .required('Required'),
  from_date: Yup.date('Invalid date').required('required'),
  to_date: Yup.date('Invalid date')
    .test('', 'Must be greater than from date', function(value) {
      const from_date = this.parent.from_date
      return value > from_date
    })
    .required('required'),
  due_from: Yup.date('Invalid date').required('required'),
  due_to: Yup.date('Invalid date')
    .test('', 'Must be greater than due from date', function(value) {
      const due_from = this.parent.due_from
      return value > due_from
    })
    .required('required'),
  project: Yup.string().required('Required'),
  functional_manager: Yup.string().required('Required')
}

export default validationSchema
