import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { ErrorMessage } from 'formik'
import InputLabel from '@material-ui/core/InputLabel'
const useStyles = makeStyles({
  colorRed: {
    color: 'red'
  },
  formControl: {
    margin: '11px 0',
    minWidth: 200,
    wrap: 'nowrap',
    fullWidth: 'true',
    display: 'flex'
  },

  hoverEffect: {
    '&:focus': {
      backgroundColor: '#004de6',
      color: 'white'
    },
    '&:hover': {
      backgroundColor: '#004de6',
      color: 'white',
      opacity: '0.5'
    }
  }
})

export default function SelectMenu({
  name,
  value,
  disabledName,
  children,
  label,
  ...rest
}) {
  const classes = useStyles()
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={label}> {label}</InputLabel>
        <Select name={name} value={value} {...rest} displayEmpty>
          <MenuItem className={classes.hoverEffect} value="" key={-1} disabled>
            <em>{disabledName}</em>
          </MenuItem>
          {children}
        </Select>
      </FormControl>
      <ErrorMessage className={classes.colorRed} name={name} component="div" />
    </>
  )
}
