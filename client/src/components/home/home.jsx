import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Typography, Avatar } from "@material-ui/core";
import { Box } from "@material-ui/core";
import CategoriesCollection from "./CategoriesCollection";
import { changeOrderStatus } from "../../redux/cartReducer/actions";
import jwt_decode from "jwt-decode";
import CarouselComponent from "../carousel/CarouselComponent";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

export default function Home(props) {
  const dispatch = useDispatch();
  const userId = JSON.parse(sessionStorage.getItem("id"));

  const jwt = props.match.query?.jwt;
  const history = useHistory();

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("status")) {
      dispatch(changeOrderStatus(userId)); // userId hardcoded
    }
    if (url.includes("loginGoogle=true")) {
      let token = url.slice(1).split("&")[1].slice(2).split("#")[0];
      let user = jwt_decode(token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", user.id);
      sessionStorage.setItem("role", user.user_role);
      sessionStorage.setItem("email", user.email);
      //dispatch(getUser(user))
      history.replace("/");
    }
    if (url.includes("loginFacebook=true")) {
      let token = url.slice(1).split("&")[1].slice(2).split("#")[0];
      let user = jwt_decode(token);
      console.log(user);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", user.id);
      sessionStorage.setItem("role", user.user_role);
      sessionStorage.setItem("email", user.email);
      //dispatch(setUser(user))
      history.replace("/");
    }

    if (url.includes("logingithub=true")) {
      let token = url.slice(1).split("&")[1].slice(2);
      let user = jwt_decode(token);
      console.log(user);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", user.id);
      sessionStorage.setItem("role", user.user_role);
      sessionStorage.setItem("email", user.email);
      //dispatch(setUser(user))
      history.replace("/");
    }
  }, [dispatch, userId]);

  useEffect(() => {
    jwt && sessionStorage.setItem("token", jwt);
  }, [jwt]);

  const user = useSelector((state) => state.loginReducer);
  useEffect(() => {
    if (window.location.href.includes("&status")) {
      dispatch(changeOrderStatus(userId));
    }
  }, [dispatch, userId, user]);

  const useStyles = makeStyles((theme) => ({
    catCol: {
      margin: "auto",
      background: theme.palette.grey[200],
    },
    letra: {
      color: "#fff",
      fontFamily: "Segoe UI Emoji",
      marginTop: '2%'
    },
    emoji: {
      height: theme.spacing(6),
      width: theme.spacing(6),
      marginLeft: '2%',
      marginTop: '2%'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
  }));
  const classes = useStyles();

  return (
    <>
      <grid className={classes.title} >
        <Typography className={classes.letra} variant="h3" align="center">
          Bienvenidos a Un Jardin Especial
        </Typography>
        <EmojiPeopleIcon className={classes.emoji} style={{color:"white"}} />
      </grid>
      <CarouselComponent />
      <Box className={classes.catCol}>
        <CategoriesCollection />
      </Box>
    </>
  );
}
