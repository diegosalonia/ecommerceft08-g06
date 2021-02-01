import { makeStyles } from '@material-ui/core';

export const useStylesProductList = makeStyles(theme => ({
    rowImage: {
        maxWidth: '150px',
        maxHeight: '150px',
    },
    confirmButton: {
        backgroundColor: '#ED4C3C',
        border: '2px solid #ef7f75',
        borderRadius: '.25em',
        background: 'initial',
        color: '#fff',
        padding: '2% 3%',
        cursor: 'pointer'
    },
    cancelButton: {
        backgroundColor: '#28A745',
        border: '2px solid #30ec2f',
        borderRadius: '.25em',
        background: 'initial',
        marginRight: '10%',
        color: '#fff',
        padding: '2% 3%',
        cursor: 'pointer'
    },
}));
