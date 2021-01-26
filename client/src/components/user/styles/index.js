import { makeStyles } from '@material-ui/core';

export const useStylesUserForm = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: theme.spacing(4),
        color: "#000",
        borderRadius: "5px"
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(2, 0, 1),
        textTransform: 'none'
      },
      close:{
        background: theme.palette.secondary.main,
        marginLeft: theme.spacing(55)
      }
}))