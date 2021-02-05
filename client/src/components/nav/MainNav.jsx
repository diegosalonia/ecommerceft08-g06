import React, { useState, useEffect } from "react";
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, AppBar, IconButton, Drawer, MenuItem, Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useHistory} from 'react-router-dom'
import { Grid } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchBar from './SearchBar';
import EcoIcon from '@material-ui/icons/Eco';
import LoginModal from '../login/LoginModal';
import {useStyles} from './styles'
//import LoginModal from './LoginModal'


const sections = [
    { title: 'Home', url: '/' },
    { title: 'Products', url: '/products' },
    { title: 'Contact', url: '/contact' },
  ];
  

const Header = ({ setSearch }) => {

    const userRole = localStorage.getItem('role');

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
        if( userRole && userRole==='admin'){
            return(
            <div className={classes.toolbarOptionsDiv}>
                <div className={classes.toolbarOptions}>
                    <ShoppingCartIcon className={classes.icons}/>
                    <Link className={classes.LinkHome} color="inherit" key="logIn" href='/cart'>Carrito</Link>
                </div>
                <div className={classes.toolbarOptions}>
                    <AccountCircleIcon/>
                    <Link className={classes.LinkHome} color="inherit" key="logIn" href='/admin'>Admin</Link>
                </div>
            </div>)
        }
        if( userRole && userRole==='user'){
            return(
            <div className={classes.toolbarOptionsDiv}>
                <div className={classes.toolbarOptions}>
                    <ShoppingCartIcon className={classes.icons}/>
                    <Link className={classes.LinkHome} color="inherit" key="logIn" href='/cart'>Carrito</Link>
                </div>
                     <div className={classes.toolbarOptions}>
                     <AccountCircleIcon/>
                     <Link className={classes.LinkHome} color="inherit" key="logIn" href='/user'>Usuario</Link>
                </div>
            </div>)
        }
    }
    const RightButtonDefault = () => {
        return (
            <div className={classes.toolbarOptionsDiv}>
                <div className={classes.toolbarOptions}>
                    <LoginModal/> 
                </div>
                <div className={classes.toolbarOptions}>
                    <ShoppingCartIcon className={classes.icons}/>
                    <Link className={classes.LinkHome} color="inherit" key="logIn" href='/cart'>Carrito</Link>
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
                                <EcoIcon fontSize="default" className={classes.leafIcon}/>
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
                {!userRole?<RightButtonDefault />:<RightButtons />}
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
                {!userRole?RightButtonDefault():RightButtons()}
                
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
