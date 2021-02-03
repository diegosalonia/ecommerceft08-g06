import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Button, Avatar, Link, TextField, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import {getToken} from '../../redux/LoginReducer/actions'
import {useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
});


const WithMaterialUI = ({onClose}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // dispatch(getToken(values.email, values.password));
      // setTimeout(function(){
      //   if(window.localStorage.getItem("loggedin")){
      //     console.log("Logged in, user id: ", window.localStorage.getItem("userId"))
      //     onClose();
      //   }
      // }, 500);

    },
  });

  const useStyles = makeStyles((theme) => ({
    form: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    formcontainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.grey[200],
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1)
    },
    signUp:{
      padding: theme.spacing(2),
    }
  }))

  const classes = useStyles();

  return (
    <div className={classes.formcontainer}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
      <div className={classes.signUp}>
        <Link variant="body2" to="/createcustomer" href="/createcustomer">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export default WithMaterialUI;
