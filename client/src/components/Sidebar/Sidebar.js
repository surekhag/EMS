/*eslint-disable*/
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import AdminNavbarLinks from '../../components/Navbars/AdminNavbarLinks'
import { NavigationLinks } from './NavigationLinks'
import styles from '../../assets/jss/material-dashboard-react/components/sidebarStyle'

const useStyles = makeStyles(styles)

export default function Sidebar(props) {
  const classes = useStyles()
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false
  }
  const { color, logo, image, logoText, routes, adminRoutes } = props
  const separator = '_____________________'
 
  const brand = (
    <div className={classes.logo}>
      <a
        href="https://www.objectedge.com/"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  )
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? 'left' : 'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />           
            <NavigationLinks
                  links={routes}
                  color={color}
                  activeRoute={activeRoute} />
            {adminRoutes ? (
              <>
                <span className={classes.itemLink}>
                  <span className={classes.itemText}>{separator} </span>
                </span>               
                 <NavigationLinks
                  links={adminRoutes}
                  color={color}
                  activeRoute={activeRoute}
                />
              </>
            ) : null}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
             <NavigationLinks
                  links={routes}
                  color={color}
                  activeRoute={activeRoute}  />
            {adminRoutes ? (
              <>
                <span className={classes.itemLink}>
                  <span className={classes.itemText}>{separator} </span>
                </span>
                <NavigationLinks
                  links={adminRoutes}
                  color={color}
                  activeRoute={activeRoute}
                />
              </>
            ) : null}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  )
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['orange', 'blue', 'green', 'purple', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
}
