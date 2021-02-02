import { makeStyles } from '@material-ui/core';

export const useStylesCartItem = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid rgba(0, 0, 0, .5)',
        maxHeight: '100px',
        maxWidth: '700px',
        justifyContent: 'flex-start',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '20%',
        padding: '0'
    },
    image: {
        maxWidth: '50%'
    },
    nameContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '0',
        marginBottom: '7%',
    }
}));

export const useStylesCart = makeStyles(theme => ({
    container: {
        display: 'flex',
    },
    cartItemsContainer: {
        maxWidth: '700px',
        display: 'flex',
    }
}));
