import { makeStyles } from '@material-ui/core';


export const useStylesProductCard = makeStyles(theme => ({
    imgWrapper: {
        position: 'relative',
      },
      buttonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'end',
        position: 'absolute',
        opacity:0,
        right: '30%',
        bottom: 60,
        left: '30%',
        top: 0,
        textAlign: 'center',
        '&:before': {
          content: ' ',
          display: 'block',
          height: "45%",
          },
        '&:hover': {
          opacity:100,
          },
      },
      button: {
        margin: 10,
        flex: '100%',
      },
      lineThrough: {
        textDecoration: 'line-through',
        padding: 10,
      }
      }))