import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Button, Avatar, Link, TextField, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useStyles , validationSchema} from './styles'
import {useDispatch} from 'react-redux'
import PersonIcon from '@material-ui/icons/Person';
import axios  from 'axios'
import { login } from '../../redux/loginReducer/actions'


const WithMaterialUI = ({onClose}) => {

  const dispatch = useDispatch();
  const params = new URLSearchParams()
  const classes = useStyles();
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
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
      dispatch(login(user.data.user));
			//setLoggedIn('Iniciaste sesión con éxito!');
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
        <Link variant="body2" to="/createcustomer" href="/user/sign-up">
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export default WithMaterialUI;
