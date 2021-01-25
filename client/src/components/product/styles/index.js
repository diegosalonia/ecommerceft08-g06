import { makeStyles } from '@material-ui/core';


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
      }));

export const useStylesProduct = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  }
}))
