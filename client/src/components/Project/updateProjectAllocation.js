import React from 'react'

import Button from '../CustomButtons/Button'

export const UpdateProjectAllocation = props => {
  const { setPageView, setUpdateAction, projectToUpdate } = props
  //In progress
  console.log(projectToUpdate)
  return (
    <>
      <h1>here </h1>
      <Button
        color="primary"
        //   disabled={isSubmitting}
        onClick={() => {
          setPageView('projectListing')
          setUpdateAction()
        }}
      >
        cancel
      </Button>
    </>
  )
}
