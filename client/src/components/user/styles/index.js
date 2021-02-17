import { makeStyles } from '@material-ui/core';

export const useStylesUserDashboard = makeStyles(theme => ({
    container: {
        minHeight: '61vh',
        paddingLeft: '0',
        maxWidth: '1220px',
    },
    gridContainer: {
        margin: '1% auto',
    },
    link: {
        textDecoration: 'none'
    },
    images: {
        height: '150px',
    },
    card: {
        transition: 'transform .5s',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.1)',
        }
    },
    cardShadow: {
        boxShadow: '1px 5px 5px rgba(0, 0, 0, .5)',
        maxWidth: '350px',
    }
}));

export const useStylesUserProfile = makeStyles(theme => ({
    large: {
        margin: theme.spacing(2,1,1,2),
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginRight: theme.spacing(3),
        color: theme.palette.primary
      },
    icon: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        color: theme.palette.primary
    },
    nameContainer:{
        display: "flex",
        alignItems: "center"
    },
    name:{
        margin: theme.spacing(4,0,0,0),
    },
    info:{
        padding: theme.spacing(2,2,2,2),
        minWidth: theme.spacing(45)
    },
    container:{
        display: "flex",
        alignItems: "center",
        flexDirection:"row"
    },
    card:{
        margin: theme.spacing(2,0,0,0),
        minWidth: theme.spacing(60),
        minHeight: theme.spacing(110),
    },
    userInfo:{
        display: "flex",
        alignItems: "center",
    },
    editar:{
        margin: theme.spacing(0,1,0,0),
        minWidth: theme.spacing(11),
    },
    cardEdit:{
        minHeight: theme.spacing(110),
        margin: theme.spacing(2,0,0,2),
        minWidth: theme.spacing(88)
    },
    form:{
        display: "flex",
        flexDirection: "column"
    },
    input:{
        margin: theme.spacing(2,1,1,1)
    },
    formButton:{
        padding: theme.spacing(1,1,1,1)
    },

}));

export const useStylesChangePassword = makeStyles(theme => ({
    password:{
        minWidth:theme.spacing(58),
        margin: theme.spacing(2,0,0,2),
    },
    button:{
        margin: theme.spacing(2,0,0,2),
    },
    formPassword:{
        padding: theme.spacing(1,1,1,1),
        display: "flex",
        flexDirection: "column"
    }
}))

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