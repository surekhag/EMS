const peerReviewDetailsStyle = {
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  grid: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  formControl: {
    margin: 11,
    minWidth: 200
  },
  boldFont: {
    fontWeight: 'bold'
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
  }
}
export default peerReviewDetailsStyle
