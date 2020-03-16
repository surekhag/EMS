import React, { useContext, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import { makeStyles } from '@material-ui/core/styles'
import bgImage from '../../assets/img/sidebar-2.jpg'
import Navbar from '../../components/Navbars/Navbar.js'
import Footer from '../../components/Footer/Footer.js'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import {
  dashboardRoutesAdmin as adminRoutes,
  dashboardRoutes as userRoutes
} from '../../routes.js'
import styles from '../../assets/jss/material-dashboard-react/layouts/userStyle.js'
import logo from '../../assets/img/oelogo.png'
import { UserContext } from '../../context-provider/user-context'

let ps

const userSwitchRoutes = (
  <Switch>
    {userRoutes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      }
      return null
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
)

const adminSwitchRoutes = (
  <Switch>
    {userRoutes.concat(adminRoutes).map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      }
      return null
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
)

const useStyles = makeStyles(styles)

export default function User({ ...rest }) {
  const { currentUser } = useContext(UserContext)
  const [routes, setRoutes] = useState()
  const [switchRoutes, setSwitchRoutes] = useState()

  // styles
  const classes = useStyles()
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef()
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const color = 'blue'

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false)
    }
  }
  React.useEffect(() => {
    if (
      currentUser &&
      (currentUser.userRole == 'Admin' || currentUser.userRole == 'admin')
    ) {
      setRoutes(userRoutes.concat(adminRoutes))
      setSwitchRoutes(adminSwitchRoutes)
    } else {
      setRoutes(userRoutes)
      setSwitchRoutes(userSwitchRoutes)
    }
  }, [currentUser])
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      })
      document.body.style.overflow = 'hidden'
    }
    window.addEventListener('resize', resizeFunction)
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
      window.removeEventListener('resize', resizeFunction)
    }
  }, [mainPanel])
  return (
    <div className={classes.wrapper}>
      {routes && switchRoutes ? (
        <>
          <Sidebar
            routes={routes}
            logoText={'Object Edge'}
            logo={logo}
            image={bgImage}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color={color}
            {...rest}
          />
          <div className={classes.mainPanel} ref={mainPanel}>
            <Navbar
              routes={routes}
              handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            {
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
            }
            {<Footer />}
          </div>
        </>
      ) : null}
    </div>
  )
}
