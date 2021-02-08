import { makeStyles } from '@material-ui/core';
import cartImage from '../../../resources/cartImage.jpg';

export const useStylesCartItem = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid rgba(0, 0, 0, .5)',
        maxHeight: '100px',
        maxWidth: '700px',
        justifyContent: 'flex-start',
        margin: '1% 0',
        paddingRight: '0'
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
    },
    quantity: {
       width: '54%',
       alignSelf: 'center',
       padding: '0 4% 0 4%',
    },
    total: {
        alignSelf: 'center',
    },
    buttonContainer: {
        width: 'fit-content',
        height: 'fit-content',
        padding: '0'
    },
    button: {
        padding: '0',
        color: theme.palette.primary.main
    }
}));

export const useStylesCart = makeStyles(theme => ({
    container: {
        display: 'flex',
    },
    cartItemsContainer: {
        maxWidth: '65%',
        display: 'flex',
        flexDirection: 'column',
    },
    isLoading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20% auto',
    },
    emptyCartContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '500px',
        height: '400px',
    },
    buttonToCatalog: {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.main,
    },
    totalContainer: {
        padding: '0 0',
        width: '65%',
    },
    deleteAllCart: {
        width: '55%',
    },
    deleteAllCartButton: {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.main,
    },
}));

export const useStylesCartTotal = makeStyles(theme => ({
    container: {
        border: '1px solid rgba(0, 0, 0, .5)',
        maxWidth: '65%'
    },
    containerSubtotal: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '3%'
    },
    containerShipping: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '3%'
    },
    containerTax: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '3%',
        paddingBottom: '3%'
    },
    containerTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '3%',
        paddingBottom: '3%'
    },
    checkoutButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5%',
    },
    bigContainer: {
        padding: '0 0',
    },
    modalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 'fit-content',
        margin: 'auto',
    },
    fadeComponent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "white",
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    buttonConfirmAddress: {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.main,
        marginTop: '2%',
    },
    containerModal: {
        display: 'flex',
        justifyContent: 'center'
    },

}));
