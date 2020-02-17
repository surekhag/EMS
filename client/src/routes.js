import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import DashboardPage from './views/Dashboard/Dashboard.js'
import UserProfile from './views/UserProfile/UserProfile.js'
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Projects from './views/Project/Project';
import Employee from './views/Employee/Employee';

const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        rtlName: 'لوحة القيادة',
        icon: Dashboard,
        component: DashboardPage,
        layout: '/admin'
    },
    {
        path: '/user',
        name: 'User Profile',
        rtlName: 'ملف تعريفي للمستخدم',
        icon: Person,
        component: UserProfile,
        layout: '/admin'
    },
    {
        path: '/employee',
        name: 'Employees',
        rtlName: 'ملف تعريفي للمستخدم',
        icon: GroupIcon,
        component: Employee,
        layout: '/admin'
    },
    {
        path: '/projects',
        name: 'Projects',
        rtlName: 'قائمة الجدول',
        icon: AssignmentIcon,
        component: Projects,
        layout: '/admin'
    },

]

export default dashboardRoutes
