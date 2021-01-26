import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import { IconButton, Typography, Link } from '@material-ui/core';
import SearchBar from '../category/search-bar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserForm from '../user/UserForm'


export default function NavBar(){
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen(!open);
    };

    const useStyles = makeStyles((theme) => ({
        list:{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "70px",
            marginRight: theme.spacing(30)
        },
        container:{
            display: "flex",
            alignItems: "center",
        },
        meme:{
            alignItems: "center",
            justifyContent: "center",
            marginTop:"20px"
        },
        navBar:{
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.primary.main
        },
        item:{
            marginLeft:"30px",
            listStyle:"none",
            fontSize:"18px"
        },
        item1:{
            textDecoration:"none",
            color: "#fff",
        },
        title:{
            color: "#fff",
            marginLeft:"20px",
            textDecoration:"none"
        },
        searchBar:{
            backgroundColor:"#fff",
            borderRadius: "5px"
        },
        icon:{
            marginLeft:"10px",
            cursor: 'pointer',
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
          },
      }));
      const classes = useStyles();
return(
    <div style={{marginBottom:"20px"}}>
        <nav className={classes.navBar}>
            <Typography variant="h5"><Link to='/' className={classes.title}>The SpecialGarden</Link></Typography>
            <div className={classes.container}>
                <ul className={classes.list}>
                    <li className={classes.item}><a href="http://localhost:3001/" className={classes.item1}>Home</a></li>
                    <li className={classes.item}><a href="http://localhost:3001/products" className={classes.item1}>Store</a></li>
                    <li className={classes.item}><a href="#" className={classes.item1}>Contact</a></li>
                </ul>
                <div className={classes.searchBar}><SearchBar/></div>
                <IconButton className={classes.icon}>
                    <ShoppingCartIcon 
                    fontSize="large"
                    style={{color: "#fff"}}/>
                </IconButton>
                <IconButton >
                    <AccountCircleIcon
                    fontSize="large"
                    style={{color: "#fff"}}
                    onClick={handleToggle}/>
                    <Backdrop className={classes.backdrop} open={open}>
                        <UserForm handleClose={handleClose}/>
                    </Backdrop>
                </IconButton>
            </div>
        </nav>
    </div>
)
}
