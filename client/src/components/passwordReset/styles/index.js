import { makeStyles } from '@material-ui/core';

 export const UseStylesResetPassword = makeStyles(theme => ({
        container:{
            minWidth: theme.spacing(100),
            display:"flex",
            alignItems:"center",
            flexDirection: "column",
            padding: theme.spacing(5,5,5,5)
        },
        input:{
            minWidth: theme.spacing(70),
            marginRight: theme.spacing(1)            
        },
        inputContainer:{
            padding: theme.spacing(1,1,1,1),
        },
        title:{
            margin: theme.spacing(2,1,2,1),
        },
        paragraph:{
            margin: theme.spacing(2,1,2,1),
        },
        link:{
            margin: theme.spacing(2,1,2,1),
        },
        inputCode:{
            minWidth: theme.spacing(60),
            marginRight: theme.spacing(1)            
        },
        inputPassword:{
            minWidth: theme.spacing(60),
            marginRight: theme.spacing(1)            
        },
    }))