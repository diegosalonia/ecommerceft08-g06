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
      rigthText: {
        textAlign: 'center',
        textDecoration: 'none',
      }
      }))