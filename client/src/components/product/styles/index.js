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
        justifyContent: 'flex-start',
        margin: '10px 0 15px 0',
    },
    inputImage: {
        // display: 'none',
    },
    labelImage: {
        marginRight: '10px',
    }
}));