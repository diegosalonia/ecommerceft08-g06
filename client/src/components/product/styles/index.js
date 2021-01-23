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
    },
    vista: {
        marginTop: '10px',        
    }
}));
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
