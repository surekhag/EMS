import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import DashboardPage from './views/Dashboard/Dashboard.js'
import UserProfile from './views/UserProfile/UserProfile.js'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Projects from './views/Project/Project'
import Employee from './components/Employee/Employee'
import PeerReview from './views/PeerReview/PeerReview'
import CreatePeer from './components/CreatePeerForm/CreatePeerForm'
import PeerReviewDetails from './components/PeerReviewDetails/PeerReviewDetails'

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
    showLink: true
  },
  // {
  //   path: '/user',
  //   name: 'User Profile',
  //   rtlName: 'ملف تعريفي للمستخدم',
  //   icon: Person,
  //   component: UserProfile,
  //   layout: '/admin',
  //   showLink: true
  // },
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
  }
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

export default dashboardRoutes
