import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import DashboardPage from './views/Dashboard/Dashboard.js'
import UserProfile from './views/UserProfile/UserProfile.js'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Projects from './views/Project/Projects'
// import Employee from './components/Employee/EmployeeSearch'
import Employee from './views/Employee/Employee'

import PeerReview from './views/PeerReview/PeerReview'
import CreatePeer from './components/CreatePeerForm/CreatePeerForm'
import PeerReviewDetails from './components/PeerReviewDetails/PeerReviewDetails'

export const dashboardRoutesAdmin = [
  {
    path: '/employee',
    name: 'Employees',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: GroupIcon,
    component: Employee,
    layout: '/admin',
    showLink: true
  },

  {
    path: '/projects',
    name: 'Projects',
    rtlName: 'قائمة الجدول',
    icon: AssignmentIcon,
    component: Projects,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/peerReview',
    name: 'Peer Review',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: GroupIcon,
    component: PeerReview,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/createPeer',
    name: 'Create Peer',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: GroupIcon,
    component: CreatePeer,
    layout: '/admin',
    showLink: false
  },
  {
    path: '/selfReview',
    name: 'Self Review',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: PeerReview,
    layout: '/admin',
    showLink: true
  },

]
export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/user',
    name: 'User Profile',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/projectDetails',
    name: 'Project History',
    rtlName: 'قائمة الجدول',
    icon: AssignmentIcon,
    component: Projects,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/peerReviewDetails',
    name: 'Peer Review History',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: GroupIcon,
    component: CreatePeer,
    layout: '/admin',
    showLink: true
  },
  {
    path: '/selfReviewDetails',
    name: 'Self Review History',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: PeerReview,
    layout: '/admin',
    showLink: true
  },
 
  // {
  //   path: '/getDetails',
  //   name: 'Peer Review Details',
  //   rtlName: 'ملف تعريفي للمستخدم',
  //   icon: GroupIcon,
  //   component: PeerReviewDetails,
  //   layout: '/admin',
  //   showLink: false
  // }
]

