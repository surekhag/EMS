const createPeerFormStyle = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  container: {
    marginTop: '27px'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'right',
    paddingRight: '30px',
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  footerDisplay: {
    justifyContent: 'space-evenly'
  },
  formControl: {
    margin: '11px 0',
    minWidth: '100%'
  },
  marginTop: {
    margin: '0px'
  },
  widthSetting: {
    width: '100%'
  },
  colorRed: {
    color: 'red'
  },
  hoverEffect: {
    '&:focus': {
      backgroundColor: '#004de6',
      color: 'white'
    },
    '&:hover': {
      backgroundColor: '#004de6',
      color: 'white',
      opacity: '0.5'
    }
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2,
    backgroundColor: '#004de6',
    color: 'white'
  }
}

export default createPeerFormStyle
