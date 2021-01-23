import { makeStyles } from '@material-ui/core';


export const useStylesProductCard = makeStyles(theme => ({

      lineThrough: {
        textDecoration: 'line-through',
      },
      root: {
        width: "100%"
      },
      media: {
        minHeight : "10em"
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
