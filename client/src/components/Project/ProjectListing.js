import Table from '../Table/Table.js'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../Card/Card.js'
import CardHeader from '../Card/CardHeader.js'
import CardBody from '../Card/CardBody.js'
import React, {useState, useEffect} from 'react';
// import GridItem from '../../components/Grid/GridItem.js'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Search from '@material-ui/icons/Search'
import CustomInput from '../CustomInput/CustomInput.js'
import Button from '../CustomButtons/Button.js'
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import GridItem from '../Grid/GridItem.js'
// import DialogActions from '@material-ui/core/DialogActions';
import { Dialog, DialogActions , DialogTitle} from "@material-ui/core";
import {deleteProject, clearProjectMsg} from '../../actions/projectAction'
import { withToastManager, useToasts } from 'react-toast-notifications'
import Employee from './Project'
const useStyles = makeStyles(styles)
 const ProjectListing = (props )=>{
     const {projectData,setPageView}  =props;
     const { addToast } = useToasts()
     const classes = useStyles()
    //  const [searchText, setsearchText] = useState('')
     const dispatch = useDispatch()
     const [projectToUpdate, setProjectToUpdate] = useState();
     const [updateAction, setUpdateAction] = useState();
     const [showDelDialog, setShowDelDialog] = useState(false);
     const deleteProjectSuccess = useSelector(state => state.projectReducer.deleteProjectSuccess);
     const deleteProjectError = useSelector(state => state.projectReducer.deleteProjectError);


    const projectListingHeader = [
    'Title',
    'Technology',
    'Client',
    'Client Location',
    'Start Date',
    'End Date'        
    ]

    // const changeHandler = e => {
    //     setsearchText(e.target.value)        
    // }

    //Clear Search text on Update Cancel/Success
    // useEffect(() => {        
    //     if(!updateAction){
    //         setsearchText();
    //     }
    // }, [updateAction])

    useEffect(() => {
        if (deleteProjectSuccess) {            
            addToast(deleteProjectSuccess, {
              appearance: 'success',
              autoDismiss: true
            });
            dispatch(clearProjectMsg());
        }
      }, [deleteProjectSuccess, addToast, dispatch])

      useEffect(() => {
        if (deleteProjectError) {            
            addToast(deleteProjectError, {
              appearance: 'error',
              autoDismiss: true
            })
            dispatch(clearProjectMsg());
        }
      }, [deleteProjectError, addToast, dispatch])


     let projectDetails = [];
     if (projectData) {
         let filteredProject = projectData.filter(
             cls =>
                 cls.status !== 'Inactive'
         )
         filteredProject.map((key, value) => {         
           let {title, technology , client,client_location, startdate, enddate} =key;

        let start = new Date(startdate);
        let end  = new Date(enddate); 
        let  mnth = ("0" + (start.getMonth() + 1)).slice(-2);
        let day = ("0" + start.getDate()).slice(-2);       
        startdate= [day,mnth,start.getFullYear()].join("/");
         
         let  formattedEnddate;
            if(enddate)
            {
                let  mnth = ("0" + (end.getMonth() + 1)).slice(-2);
                let day = ("0" + end.getDate()).slice(-2);    
               formattedEnddate= [day,mnth,end.getFullYear()].join("/")  

            }
         enddate  = enddate ? formattedEnddate:'-';

           const data ={ title, technology , client,client_location, startdate, enddate}           
             projectDetails.push(Object.values(data))
             return 1
         }); 
     }

     const links= ["Update", "Delete"];

     const getprojectToUpdate=(projectData,title)=>{
        return projectData.filter(item=>{            
            if(item.title == title)
             return item;
     })
    }

     const updateUser= (val)=>{
         setUpdateAction('update');
        const user = getprojectToUpdate(projectData, val[0]);        
        setProjectToUpdate(user);        
     }

     const deleteUser= (val)=>{
        const user = getprojectToUpdate(projectData, val[0]);
        setUpdateAction('delete');
        setProjectToUpdate(user);
        setShowDelDialog(true);
    }
    
    const handleYesDelete =()=>{          
        dispatch(deleteProject(projectToUpdate[0]._id));
        setShowDelDialog(false);
    }

    const handleNoDelete = ()=>{
        setShowDelDialog(false);
    }

    return(
            <>            
            {updateAction=='update' ? 
            <Employee setUpdateAction ={setUpdateAction} projectToUpdate = {projectToUpdate} setPageView= {setPageView} /> : 
            <> 
        <GridItem xs={12} sm={12} md={12}>
        <Card plain>
            <CardHeader plain color="primary">                
                <h4 className={classes.cardTitleWhite}>
                    Project List
                </h4>
            </CardHeader>
            <CardBody>
                <Table
                    tableHeaderColor="gray"
                    tableHead={
                        projectData && projectDetails.length >0                          
                            ?projectListingHeader
                            : null
                    }
                    tableData={projectDetails ? projectDetails : null}
                    addLinks = {links}
                    updateUser ={updateUser}
                    deleteUser = {deleteUser}
                    showLink={false}
                />
            </CardBody>
        </Card>
    </GridItem>
            <Dialog
                title="Delete Project"    
                modal={true}
                open={showDelDialog}>
                <DialogActions>
                
                <GridItem xs={12} sm={12} md={12}>
                <p> Are you sure you want to delete this Project ? </p>
                <Button onClick={handleYesDelete}> Yes</Button> <Button onClick= {handleNoDelete}> No</Button>
                </GridItem>

                </DialogActions> 
            </Dialog>
            </>}
       
    </>
    )
}

export default ProjectListing;