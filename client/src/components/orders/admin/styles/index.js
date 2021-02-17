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
    },
    searchBar: {
        width: '17%',
    },
    searchBarContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    formControl: {
        width: '17%',
        marginRight: '1%',
    },
    noResults: {
        marginTop: '10%',
    }
}));
