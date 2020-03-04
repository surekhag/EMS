import Table from '../../components/Table/Table.js'
import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardBody from '../../components/Card/CardBody.js'
import React from 'react';
// import GridItem from '../../components/Grid/GridItem.js'
import InputLabel from '@material-ui/core/InputLabel'
import Search from '@material-ui/icons/Search'
import CustomInput from '../../components/CustomInput/CustomInput.js'
import Button from '../../components/CustomButtons/Button.js'
import GridItem from '../../components/Grid/GridItem.js'


 const EmployeeListing = (props )=>{
     const {employeeData, employeeDetails,classes, header, changeHandler, searchText}  =props;
    return(
            <>
            <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                    formControlProps={{
                        className: classes.margin + ' ' + classes.search
                    }}
                    inputProps={{
                        onChange: changeHandler,
                        placeholder: 'Search Employee',
                        inputProps: {
                            'aria-label': 'Search'
                        }
                    }}
                />
                <Button color="white" aria-label="edit" justIcon round>
                    <Search />
                </Button>
            </GridItem>

        <GridItem xs={12} sm={12} md={12}>
        <Card plain>
            <CardHeader plain color="primary">                
                <h4 className={classes.cardTitleWhite}>
                    Employee List
                </h4>
            </CardHeader>
            <CardBody>
                <Table
                    tableHeaderColor="gray"
                    tableHead={
                        employeeData && employeeDetails.length >0 && searchText                         
                            ?header
                            : null
                    }
                    tableData={employeeDetails ? employeeDetails : null}
                    showLink={false}
                />
            </CardBody>
        </Card>
    </GridItem>
    </>
    )
}

export default EmployeeListing;