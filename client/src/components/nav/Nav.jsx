import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import SearchBar from '../category/search-bar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function NavBar(){
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
            with: "100%",
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
            marginLeft:"10px"
        }
      }));
      const classes = useStyles();
return(
    <div style={{marginBottom:"20px"}}>
    <nav className={classes.navBar}>
        <Typography variant="h5"><a href="http://localhost:3001/"  className={classes.title}>The SpecialGarden</a></Typography>
        <div className={classes.container}>
            <ul className={classes.list}>
                <li className={classes.item}><a href="http://localhost:3001/" className={classes.item1}>Home</a></li>
                <li className={classes.item}><a href="http://localhost:3001/products" className={classes.item1}>Store</a></li>
                <li className={classes.item}><a href="#" className={classes.item1}>Contact</a></li>
            </ul>
            <div className={classes.searchBar}><SearchBar/></div>
            <Button className={classes.icon}>
                <ShoppingCartIcon 
                   fontSize="large"
                   style={{color: "#fff"}}/>
            </Button>
            <Button className={classes.icon}>
                <AccountCircleIcon 
                   fontSize="large"
                   style={{color: "#fff"}}/>
            </Button>
        </div>
        
    </nav>
    </div>
)
}
