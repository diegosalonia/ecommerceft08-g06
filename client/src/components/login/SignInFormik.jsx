import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Image, Button, Avatar, Link, TextField, Typography, Grid} from '@material-ui/core';
import {useStyles , validationSchema} from './styles'
import {useDispatch} from 'react-redux'
import PersonIcon from '@material-ui/icons/Person';
import axios  from 'axios'
import { login } from '../../redux/loginReducer/actions'
import Google from '../../assets/Google.svg'
import facebook from '../../assets/facebook.svg';
import github from '../../assets/github.svg'
import {jwt} from 'jsonwebtoken'
 
  const WithMaterialUI = ({onClose}) => {
    const dispatch = useDispatch();
    const params = new URLSearchParams()
    const classes = useStyles();
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    
    const signGoogle = () => {
      window.location.href = `http://localhost:3000/auth/google`;
    }

    const signFacebook = () => {
      window.location.href = `http://localhost:3000/auth/facebook`;
    }

    const signGitHub = () => {
      window.location.href = `http://localhost:3000/auth/github`;
    }
    
  const url = "http://localhost:3000/auth/login";

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      params.append('email', values.email)
      params.append('password', values.password)

      const user = await axios.post(url, params, config)
      dispatch(login(user.data));
    },
  });
  
  return (
    <div className={classes.formcontainer}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          className={classes.input}
          fullWidth
          variant="outlined"
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={classes.input}
          fullWidth
          variant="outlined"
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
         <Grid container>
            <Grid item xs className={classes.link}>
              <Link href="/password-reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/user/sign-up" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
      </div>
      <div className={classes.signUp}>  ingresar con
        <Button onClick = { signGoogle } > 
          {<img src={Google} />}
        </Button>
        <Button onClick = { signFacebook } > 
          {<img src={facebook} />}
        </Button>
        <Button onClick = { signGitHub } > 
          {<img src={github} />}
        </Button>
      </div>
    </div>
  );
};

export default WithMaterialUI;
