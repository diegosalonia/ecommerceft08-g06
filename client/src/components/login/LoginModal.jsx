import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SignInFormik from './SignInFormik';
import PersonIcon from '@material-ui/icons/Person';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display:'flex',alignItems:'center',justifyContent:'center',
        backgroundColor: 'none',
     
    },   
    toolbarOptions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover':{
            textDecoration: "underline"
        }
        //padding: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signIn: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main
    },
  }));

export default function LoginModal ({ inCart }){
      const classes = useStyles();
      const [open, setOpen] = useState(false);

      const handleOpen = () => {
          setOpen(true);
      }

        const handleClose = () => {
          setOpen(false);
      }
 
      return (
        <>  
            { !inCart ?
                <div onClick={handleOpen} className={classes.toolbarOptions}>
                    <PersonIcon/>
                    LogIn
                </div>
                      : <Button onClick={handleOpen} className={classes.signIn} >Sign in</Button>
            }
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                disableAutoFocus
                disableEnforceFocus
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 2000,}}>
                <Fade in={open}>
                    <div>
                        <SignInFormik onClose={handleClose}/>
                    </div>
                </Fade>
            </Modal>
{/*             <Modal open={open} onClose={handleClose} className={classes.paper}  >
                <SignInFormik onClose={handleClose}/>
            </Modal> */}
        </> 
      )
  }
