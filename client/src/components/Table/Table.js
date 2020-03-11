import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
// core components
import Button from '../../components/CustomButtons/Button.js'
import styles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'

const useStyles = makeStyles(styles)

export default function CustomTable(props) {
  const classes = useStyles()
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    showLink,
    buttonText,
    onClickHandler,
    addLinks,
    updateUser,
    deleteUser
  } = props
  return (
    <div className={classes.tableResponsive}>
      {tableHead && tableData ? (
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + ' ' + classes.tableHeadCell
                      }
                      key={key + 'cell'}
                    >
                      {prop}
                    </TableCell>
                  )
                })}
                {showLink ? <TableCell /> : null}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, k) => {
              return (
                <TableRow key={k} className={classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    )
                  })}

                {addLinks? (<p className={classes.tableCell}>
                {addLinks.map(item=>{
                  if(item=='Update')
                    return <span className= {classes.links} onClick={e =>updateUser(prop, e)}>{item}</span>
                    else if (item=='Delete')
                    return <span className= {classes.links} onClick={e =>deleteUser(prop, e)}>{item}</span>                  
                })}
                </p>): null} 

                  {showLink ? (
                    <TableCell className={classes.tableCell} key={k + 'cell'}>
                      <Button
                        color="success"
                        size="sm"
                        onClick={() => {
                          onClickHandler(k)
                        }}
                      >
                        {' '}
                        {buttonText}{' '}
                      </Button>
                    </TableCell>
                  ) : null}
               
    
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : null}
    </div>
  )
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
}

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string)
}
