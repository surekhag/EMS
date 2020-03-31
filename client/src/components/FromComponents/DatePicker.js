import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'
import { ErrorMessage } from 'formik'

const useStyles = makeStyles({
  colorRed: {
    color: 'red'
  },
  widthSetting: {
    width: '100%'
  },
  formLabel: {
    color: '#000',
    fontWeight: '700'
  }
})

export default function DatePicker({ name, value, ...rest }) {
  const classes = useStyles()
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid>
        <KeyboardDatePicker
          disableToolbar
          {...rest}
          variant="inline"
          name={name}
          format="MM/dd/yyyy"
          className={classes.widthSetting}
          margin="normal"
          value={value}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          InputLabelProps={{
            className: classes.formLabel
          }}
        />
        <ErrorMessage
          className={classes.colorRed}
          name={name}
          component="div"
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}
