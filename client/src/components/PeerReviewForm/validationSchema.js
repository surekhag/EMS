import * as Yup from 'yup'
import { yupRequired, yupRequiredDate } from '../../helpers/yupValidations'

const validationSchema = {
  employee_under_review: yupRequired('Employee under review'),
  review_form_link: yupRequired('Form link'),
  employee_reviewing: yupRequired('Employee reviewing')
    .notOneOf(
      [Yup.ref('employee_under_review'), null],
      'Employee under review must not equal to Employee reviewing'
    )
    .required('Required'),
  from_date: yupRequiredDate('Review from date'),
  to_date: yupRequiredDate('Review to date').test(
    '',
    'Must be greater than from date',
    function(value) {
      const from_date = this.parent.from_date
      return value > from_date
    }
  ),
  due_from: yupRequiredDate('Due from'),
  due_to: yupRequiredDate('Due to').test(
    '',
    'Must be greater than due from date',
    function(value) {
      const due_from = this.parent.due_from
      return value > due_from
    }
  ),
  project: yupRequired('Project'),
  functional_manager: yupRequired('Functional manager')
}

export default validationSchema
