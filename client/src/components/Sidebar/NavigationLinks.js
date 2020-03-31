import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import styles from '../../assets/jss/material-dashboard-react/components/sidebarStyle'

import Icon from '@material-ui/core/Icon'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
const useStyles = makeStyles(styles)

export const NavigationLinks = props => {
  const classes = useStyles()
  let { links, color, activeRoute } = props
  return (
    <List className={classes.list}>
      {links &&
        links.map((prop, key) => {
          let activePro = ' '
          let listItemClasses
          if (prop.path === '/upgrade-to-pro') {
            activePro = classes.activePro + ' '
            listItemClasses = classNames({
              [' ' + classes[color]]: true
            })
          } else {
            listItemClasses = classNames({
              [' ' + classes[color]]: activeRoute(prop.layout + prop.path)
            })
          }
          const whiteFontClasses = classNames({
            [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path)
          })
          return (
            <NavLink
              to={prop.layout + prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              {prop.showLink ? (
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof prop.icon === 'string' ? (
                    <Icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses,
                        {
                          [classes.itemIconRTL]: props.rtlActive
                        }
                      )}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses,
                        {
                          [classes.itemIconRTL]: props.rtlActive
                        }
                      )}
                    />
                  )}
                  <ListItemText
                    primary={props.rtlActive ? prop.rtlName : prop.name}
                    className={classNames(classes.itemText, whiteFontClasses, {
                      [classes.itemTextRTL]: props.rtlActive
                    })}
                    disableTypography={true}
                  />
                </ListItem>
              ) : null}
            </NavLink>
          )
        })}
    </List>
  )
}
