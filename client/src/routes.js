import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import GroupIcon from '@material-ui/icons/Group';
import DashboardPage from './views/Dashboard/Dashboard'
import UserProfile from './views/UserProfile/UserProfile'
import PeerReview from './views/PeerReview/PeerReview'
import CreatePeer from  './components/CreatePeerForm/CreatePeerForm'

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
        path: '/peerReview',
        name: 'Peer Review',
        rtlName: 'ملف تعريفي للمستخدم',
        icon: GroupIcon,
        component: PeerReview,
        layout: '/admin'
    },
    {
        path: '/createPeer',
        name: 'Create Peer',
        rtlName: 'ملف تعريفي للمستخدم',
        icon: GroupIcon,
        component: CreatePeer,
        layout: '/admin'
    }
]

export default dashboardRoutes
