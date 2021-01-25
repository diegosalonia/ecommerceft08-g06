import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';


export default function Footer(){
    const useStyles = makeStyles((theme) => ({

        footer:{
            backgroundColor: theme.palette.primary.main,
            position: "absolute",
            zIndex: "3",
            bottom: "0",
            width: "100%",
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            display: "flex",
            alignItems: "center",
        },
        title:{
            color: "#fff",
            marginLeft:"20px",
            textDecoration:"none"
        },
        container:{
            padding: theme.spacing(1),
            height: "100%",
            width: "33%",
            color: "#fff"
        }      
      }));
      const classes = useStyles();

    return(
        <footer className={classes.footer}>        
            <div className={classes.container}>
                <Typography variant="h5">
                    <a href="http://localhost:3001/"  className={classes.title}>
                    The SpecialGarden
                    </a>
                </Typography>
            </div>
            <div className={classes.container}>Copyright ©<p>hola esto deberia ser informacion del sitio web pero me da mucha pereza pensar en algo para escribir</p></div>
            <div className={classes.container}>
                <Button><FacebookIcon fontSize="large" style={{color: "#fff"}}/></Button>
                <Button><InstagramIcon fontSize="large" style={{color: "#fff"}}/></Button>
                <Button><TwitterIcon fontSize="large" style={{color: "#fff"}}/></Button>
                <Button><WhatsAppIcon fontSize="large" style={{color: "#fff"}}/></Button>
            </div>
        </footer>
    )
}