import { makeStyles } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';


export const useStylesProductForm = makeStyles(theme => ({
    productForm: {
        margin: 'auto',
        width: '40%',
    },
    formSwitch: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px 0 5px 0',
        margin: '0'
    },
    imageUpload: {
        display: 'flex',
        margin: '10px 0 15px 0',
        justifyContent: 'center',
        border: '1px dashed gray',
    },
    labelImage: {
        marginRight: '10px',
    },
    previewImageDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        maxWidth: '200px',
        maxHeight: '130px',
    }
}));

export const useStylesProductCard = makeStyles(theme => ({
      lineThrough: {
        textDecoration: 'line-through',
        fontSize: '.9rem',
        color: 'gray'
      },
      root: {
        width: "100%",
        Height:'400px',
        position: "relative"
      },
      hasStock: {
        display: 'none'
      },
      outOfStock: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        opacity: 0.4,
        display: 'block',
        zIndex: 10000,
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
      }));

export const useStylesProduct = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    maxWidth: '70%'
  },
  categories: {
    fontSize: '1rem',
    display: 'flex',
    padding: '4% 0 0 0'
  },
  category: {
    fontSize: '.9rem',
    padding: '1% 4%',
    borderRadius: '11%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    boxShadow: '1px 5px 10px rgb(0 0 0 / 50%)'
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '6%',
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10% 0 0 0'
  },
  actualPrice: {
    fontSize: 'xx-large',
  },
  lineThrough: {
    textDecoration: 'line-through',
    fontSize: '.8rem',
    color: 'gray'
  },
  stock: {
    margin: '10% 0'
  },
  description: {
    margin: '5% 0'
  },
  textCart: {
    paddingLeft: '8px',
  },
  isLoading: {
    display: 'flex',
    justifySelf: 'center',
    alignItems: 'center',
    margin: '20% auto',
  },
  rating: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4% 0 0 0',

  },
  ratingReviews: {
    marginLeft: '4%',
    color: 'gray'
  }
}))
