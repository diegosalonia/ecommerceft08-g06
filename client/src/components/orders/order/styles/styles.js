import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>({
    containers:{
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop:"20px",
        minWidth: 800,
        borderRadius: "5px"
    },
    container:{
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop:"20px",
        minWidth: 800,
    },
    table: {
        minWidth: "100%",
        // minHeight: 300
    },
    cellname:{
        padding: theme.spacing(1, 1, 1, 2),
    },
    cell:{
        padding: theme.spacing(2, 1, 2, 2),
    },
    title:{
        padding: theme.spacing(2, 1, 2, 2),
        backgroundColor: theme.palette.primary.light
    },
    paper:{
        boxShadow: "1px 5px 5px rgba(0,0,0,0.5)"
    }
}))

export default useStyles