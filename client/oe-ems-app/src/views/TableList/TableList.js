import React from "react";
import { connect } from 'react-redux';
import {compose} from 'redux';
//@material-ui/icons components
import Search from "@material-ui/icons/Search";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// core components
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import { loadAllEmployeeData } from "../../actions/index.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


class TableList extends React.Component {
  constructor(){
    super();
    this.state={
      searchText:''
    }
  }

  componentDidMount(){
    this.props.loadAllEmployeeData();
  }
  changeHandler=(e)=>{
    this.setState({searchText:e.target.value});
  }
  
  render(){
    const { classes } = this.props;
    const {searchText} = this.state;
    let tempArr =[];
    if(this.props.EmployeeData){
      let filteredEmployee = this.props.EmployeeData.data.filter(cls => cls.Name.toLowerCase().includes(searchText.toLowerCase().trim()));
      filteredEmployee.map((key,value)=>{
        tempArr.push((Object.values(key)));
      });
    }
    return (
      <GridContainer>
        {/* <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Simple Table</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="gray"
                tableHead={["Name", "Country", "City", "Salary"]}
                tableData={[
                  ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                  ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                  ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                  ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                  ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                  ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem> */}
        <GridItem xs={12} sm={12} md={12}>
            <CustomInput
              formControlProps={{
                className: classes.margin + " " + classes.search
              }}
              inputProps={{
                onChange:this.changeHandler,
                placeholder: "Search Employee",
                inputProps: {
                  "aria-label": "Search"
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
                tableHead={this.props.EmployeeData ? Object.keys(this.props.EmployeeData.data[0]):null}
                tableData={tempArr  ? tempArr:null}
                showLink={true}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
      EmployeeData: state.EmployeeInfo.EmployeeData,
    };
}
const mapDispatchToProps = (dispatch) => ({
  loadAllEmployeeData: () => dispatch(loadAllEmployeeData())
});


const TableListWithHOC = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(TableList);
export default TableListWithHOC;
