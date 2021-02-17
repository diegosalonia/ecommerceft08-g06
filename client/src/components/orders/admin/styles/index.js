import { makeStyles } from '@material-ui/core';

export const useStylesOrderList = makeStyles(theme => ({
    fadeComponent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15%',
        backgroundColor: 'white',
        width: 'fit-content',
        height: '30%',
    },
    buttonConfirmAddress: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
    }
}));
