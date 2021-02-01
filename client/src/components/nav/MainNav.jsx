import React, { useState, useEffect } from "react";
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, AppBar, IconButton, Drawer, MenuItem, Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useHistory} from 'react-router-dom'
import { Grid } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchBar from './SearchBar';

//import LoginModal from './LoginModal'

const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      justifyContent: 'space-between',
      backgroundColor: theme.palette.primary.main
    },
    toolbarMobile:{
        backgroundColor: theme.palette.primary.main
    },
    logoContainer:{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    backgroundToolbar: {
      backgroundColor: theme.palette.primary.main,  
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      '&:hover':{
        color: "inherit",
        }
    },
    toolbarOptionsDiv: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.palette.primary.main

    },
    toolbarOptions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.main

    },
    mobileToolbar: {
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.main

    },
    driverChoices:{
        padding: "20px 30px",
    },
    LinkHome:{
        '&:hover':{
            color: "inherit",
            
            }
    },
    
    
   
  }));
  


const sections = [
    { title: 'Inicio', url: '/' },
    { title: 'Productos', url: '/products' },
    { title: 'Contacto', url: '/contact' },
  ];
  

const Header = ({ setSearch }) => {
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    })
    const classes = useStyles();
    const { mobileView, drawerOpen } = state;
    const localy = useHistory()

  
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const goHome = (e) => {
    return localy.push("/")
  }

  const RightButtons = () => {
        return (
            <div className={classes.toolbarOptionsDiv}>
                <div className={classes.toolbarOptions}>
                    {/* <LoginModal/> */} 
                </div>
                <div className={classes.toolbarOptions}>
                    <ShoppingCartIcon/>
                    <Link className={classes.LinkHome} color="inherit" key="logIn" href='/cart'>Cart</Link>
                </div>
                <div className={classes.toolbarOptions}>
                    <AccountCircleIcon/>
                    <Link className={classes.LinkHome} color="inherit" key="logIn" href='/admin'>Admin</Link>
                </div>
                <div className={classes.toolbarOptions}>
                    <AccountCircleIcon/>
                    <Link className={classes.LinkHome} color="inherit" key="logIn" href='#'>Usuario</Link>
                </div>
            </div>
        )
    }
      const displayDesktop = () => {
          
        return (
            <Toolbar className={classes.toolbar}>
                <div className={classes.logoContainer} >
                    <Link className={classes.LinkHome} color="inherit" href="/" onClick={(e) => goHome(e)}>
                        <Grid container>
                            <Grid item>
                                <StorefrontIcon fontSize="default"/>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" className={classes.toolbarTitle}>Un Jardin Especial</Typography>
                            </Grid>
                        </Grid> 
                    </Link>
                </div>
                <Toolbar component="nav" className={classes.toolbarSecondary}>
                        {sections.map((section) => (
                            <Link color="inherit" key={section.title} to={section.url} href={section.url} className={classes.toolbarLink}>
                                {section.title}
                            </Link>
                        ))}
                </Toolbar>
                <SearchBar setSearch = {setSearch}/>
                <RightButtons />    
            </Toolbar>
        )
    } 


    const displayMobile = () => {
        const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));
        return (
            <Toolbar className={classes.mobileToolbar}>
                <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}> 
                    <MenuIcon />
                </IconButton>
                <Drawer className={classes.drawerChoices} anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                    <div>{getDrawerChoices()}</div>
                </Drawer>
                <div className={classes.logoContainer}>
                    <StorefrontIcon fontSize="default"/>
                </div>
                {RightButtons()}
                
            </Toolbar>
        )
    }
    const getDrawerChoices = () => {
        return sections.map((section) => {
          return (
            <Link href={section.url} color="inherit" key={section.title}>
              <MenuItem>{section.title}</MenuItem>
            </Link>
          );
        });
      };
    

    return (
        <header>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            <AppBar position="static" className={classes.backgroundToolbar}>
                <Container maxWidth="lg"> 
                    {mobileView ? displayMobile() : displayDesktop()}
                </Container>    
            </AppBar>
        </header>
    )
}

export default Header;