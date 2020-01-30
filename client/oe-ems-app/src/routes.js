import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import DashboardPage from "./views/Dashboard/Dashboard.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
import TableList from "./views/TableList/TableList.js";
import LeaveForm from "./views/LeaveForm/LeaveForm.js";
import WFHForm from "./views/WFHForm/WFHForm.js"


const dashboardRoutes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    {
      path: "/user",
      name: "User Profile",
      rtlName: "ملف تعريفي للمستخدم",
      icon: Person,
      component: UserProfile,
      layout: "/admin"
    },
    {
      path: "/table",
      name: "All Employees",
      rtlName: "قائمة الجدول",
      icon: "content_paste",
      component: TableList,
      layout: "/admin"
    },
    {
      path: "/LeaveForm",
      name: "Leave Request",
      rtlName: "قائمة الجدول",
      icon: AssignmentLateIcon,
      component: LeaveForm,
      layout: "/admin"
    },
    {
      path: "/WFHForm",
      name: "WFH Request",
      rtlName: "قائمة الجدول",
      icon: HomeWorkIcon,
      component: WFHForm,
      layout: "/admin"
    }
];

export default dashboardRoutes;
