import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { ErrorMessage } from 'formik'

const useStyles = makeStyles({
  colorRed: {
    color: 'red'
  },
  formControl: {
    margin: 11,
    minWidth: 200
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
  ...rest
}) {
  const classes = useStyles()
  return (
    <>
      <FormControl className={classes.formControl}>
        <Select name={name} value={value} {...rest} displayEmpty>
          <MenuItem className={classes.hoverEffect} value="" key={-1} disabled>
            {disabledName}
          </MenuItem>
          {children}
        </Select>
      </FormControl>
      <ErrorMessage className={classes.colorRed} name={name} component="div" />
    </>
  )
}
