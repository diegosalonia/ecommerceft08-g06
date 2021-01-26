import React from 'react'
import { useStylesUserForm } from './styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Switch} from '@material-ui/core/';


export default function UserForm({handleClose}){

    const classes = useStylesUserForm()

    const validationSchema = yup.object({
        first_name: yup
          .string('Enter your firs name')
          .required('first name is required'),
        last_name: yup
          .string('Enter category last name')
          .required('last name is required'),
        email: yup
        .string('Enter your email adress')
        .required('email is required'),
        password: yup
          .string('Enter your password')
          .required('invalid paswword')

      });

    const formik = useFormik({
        initialValues:{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phoneNumber: null,
            shippingAdress: "",
            billingAdress: "",
            email_notification: false
        },
        validationSchema: validationSchema,

        onSubmit:  (values) => {
          axios.post('http://localhost:3000/users/', {form:values})
          .then((res) => {
            console.log("Succes",res);
            alert('User created');
          })
          .catch(error => console.log("Error on request: ",error));
        }
    })

    return (
        <Container  maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Button className = {classes.close} onClick={handleClose} size="small">X</Button>
              <Typography component="h1" variant="h5">
              Sign up
              </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                 <TextField
                   required
                   fullWidth
                   variant="outlined"
                   id="firts_Name"
                   name="first_name"
                   label="First Name"
                   value={formik.values.first_name}
                   onChange={formik.handleChange}
                   error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                   helperText={formik.touched.first_name && formik.errors.first_name}
                 />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                   required
                   fullWidth
                   variant="outlined"
                   id="last_name"
                   name="last_name"
                   label="last name"
                   value={formik.values.last_name}
                   onChange={formik.handleChange}
                   error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                   helperText={formik.touched.last_name && formik.errors.last_name}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   required
                   fullWidth
                   variant="outlined"
                   id="email"
                   name="email"
                   label="email adress"
                   value={formik.values.email}
                   onChange={formik.handleChange}
                   error={formik.touched.email && Boolean(formik.errors.email)}
                   helperText={formik.touched.email && formik.errors.email}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   required
                   fullWidth
                   variant="outlined"
                   id="password"
                   name="password"
                   label="password"
                   type="password"
                   value={formik.values.password}
                   onChange={formik.handleChange}
                   error={formik.touched.password && Boolean(formik.errors.password)}
                   helperText={formik.touched.password && formik.errors.password}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="phoneNumber"
                   name="phoneNumber"
                   label="phone number(optional)"
                   value={formik.values.phoneNumber}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="shippingAdress"
                   name="shippingAdress"
                   label="shipping adress(optional)"
                   value={formik.values.shippingAdress}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="billingAdress"
                   name="billingAdress"
                   label="billing adress(optional)"
                   value={formik.values.billingAdress}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch
                        checked={formik.email_notification}
                        onChange={formik.handleChange}
                        name="email_notification"            
                        value={formik.values.email_notification}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />}
                    label="I want to receive updates via email."
                  />
                </Grid>
              </Grid>
              
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Button color="primary" variant="contained" fullWidth type="submit"  className={classes.submit}>
            Sing Up
            </Button>
            <Button color="primary" variant="contained" fullWidth type="submit" className={classes.submit} href="http://localhost:3001/admin">
            Admin
            </Button>
            </form>
          </div>
          <Box mt={5}>
          </Box>
        </Container>
      );
};
