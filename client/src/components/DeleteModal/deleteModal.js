import { Dialog, DialogActions } from '@material-ui/core'
import React from 'react'
import Button from '../../components/CustomButtons/Button'
// import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import GridItem from '../../components/Grid/GridItem'

export const DeleteModal = (props)=>{
    const {
         title,
          showDelDialog,
          handleYesDelete,
          handleNoDelete
    } = props;


    return (
         <Dialog title={title} modal={true} open={showDelDialog}>
            <DialogActions>
              <GridItem xs={12} sm={12} md={12}>
                <p> Are you sure you want to delete this Information ? </p>
                <Button onClick={handleYesDelete}> Yes</Button>
                <Button onClick={handleNoDelete}> No</Button>
              </GridItem>
            </DialogActions>
        </Dialog>
    )
}