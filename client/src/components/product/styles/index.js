import { makeStyles } from '@material-ui/core';


export const useStylesProductCard = makeStyles(theme => ({

      lineThrough: {
        textDecoration: 'line-through',
      },
      root: {
        maxWidth: 350,
      },
      media: {
        height: 150,
      },
      noLinkStyle: {
        textDecoration: 'none',
      },
      info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }
      }))
