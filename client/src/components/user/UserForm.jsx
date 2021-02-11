import React from 'react'
import { makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { Button, CssBaseline, TextField, FormControlLabel, Link, Grid, Box, Typography, Container, Switch} from '@material-ui/core/';

export default function UserForm(props){
  const useStylesUserForm = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: theme.spacing(4),
        color: "#000",
        borderRadius: "5px"
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        marginTop: theme.spacing(2),
        textTransform: 'none'
      }
}))

    const classes = useStylesUserForm()

    const validationSchema = yup.object({
        first_name: yup
          .string('Enter your first name')
          .required('first name is required'),
        last_name: yup
          .string('Enter your last name')
          .required('last name is required'),
        email: yup
        .string('Enter your email addres')
        .required('email is required'),
        password: yup
          .string('Enter your password')
          .required('password cannot be blank')

      });

    const formik = useFormik({
        initialValues:{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone_number: null,
            shipping_address: null,
            billing_address: null,
            email_notification: false
        },
        validationSchema: validationSchema,

        onSubmit:  (values) => {
          axios.post('http://localhost:3000/users/', { form:values })
          .then((res) => {
            console.log("PROPS: ", props);
            alert('User created');
            props.history.push('/');
          })
          .catch(error => console.log("Error on request: ",error));
        }
    })

    return (
        <Container  maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
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
                   label="email addres"
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
                   id="phone_number"
                   name="phone_number"
                   label="phone number(optional)"
                   value={formik.values.phone_number}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="shipping_address"
                   name="shipping_address"
                   label="shipping addres(optional)"
                   value={formik.shipping_address}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="billing_address"
                   name="billing_address"
                   label="billing addres(optional)"
                   value={formik.billing_address}
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
              <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
            <Grid >
            
            </Grid>       
            </form>
          </div>
          <Box mt={5}>
          </Box>
        </Container>
      );
};
