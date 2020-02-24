import {
  grayColor,
  whiteColor,
  primaryColor
} from '../../material-dashboard-react.js'

const accordionStyle = {
  root: {
    width: '100%',
    margin: '10px 0'
  },
  heading: {
    padding: '15px',
    borderRadius: '3px',
    background: `linear-gradient(60deg, ${primaryColor}, ${primaryColor})`,
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 77, 230,.4)'
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    fontSize: 'x-large',
    textTransform: 'uppercase',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1'
    }
  }
}
export default accordionStyle
