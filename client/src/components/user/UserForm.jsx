import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { Button, CssBaseline, TextField, FormControlLabel, Link, Grid, Box, Typography, Container, Switch} from '@material-ui/core/';
import Swal from 'sweetalert2';

const showAlertConflict = (message, time) => {
  return Swal.fire({
      position: 'center',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: time,
  });
};

const showAlertSuccess = (message, time) => {
  return Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: time,
  });
};

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

    const numericRegex = /(?=.*[0-9])/
    const lowerCaseRegex = /(?=.*[a-z])/
    const upperCaseRegex = /(?=.*[A-Z])/

    const validationSchema = yup.object({
      first_name: yup
        .string("Ingresa tu nombre")
        .required("Tienes que ingresar tu nombre"),
      last_name: yup
      .string("Ingresa tu apellido")
      .required("Tienes que ingresar tu apellido"),
      email: yup
        .string("Ingresa tu correo electronico")
        .email("Debes ingresar un correo electronico valido")
        .required("Debes ingresar un correo electronico"),
      password: yup 
        .string("Ingresa una contraseña")
        .required("Debes ingresar una contraseña")
        .min(8, "Debe tener minimo 8 caracteres")
        .matches(numericRegex, "Debe tener minimo un numero")
        .matches(lowerCaseRegex, "Debe tener minimo una minuscula")
        .matches(upperCaseRegex, "Debe tener minimo una mayuscula"),
      passwordConfirm: yup
      .string("Confirma tu contraseña")  
      .oneOf([yup.ref("password")], "Las contraseñas no son iguales")
      .required("Debes confirmar tu contraseña")
    })

    const formik = useFormik({
        initialValues:{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            phone_number: null,
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            postal_code: null,
            country: "",
            billing_addres: "",
            email_notification: false
        },
        validationSchema: validationSchema,

        onSubmit:  (values) => {
          axios.post('http://localhost:3000/users/', { form:values })
          .then((res) => {

            showAlertSuccess("Usuario creado", 2000)
            setTimeout(()=>{props.history.push('/');},2000)
          })
          .catch(err => {
            showAlertConflict((err.response.data.msg || err), 2000)
          });

        }
    })

    return (
        <Container  maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
              <Typography component="h1" variant="h5">
              Registrate
              </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                 <TextField
                   fullWidth
                   variant="outlined"
                   id="first_Name"
                   name="first_name"
                   label="Nombre"
                   value={formik.values.first_name}
                   onChange={formik.handleChange}
                   error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                   helperText={formik.touched.first_name && formik.errors.first_name}
                 />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="last_name"
                   name="last_name"
                   label="Apellido"
                   value={formik.values.last_name}
                   onChange={formik.handleChange}
                   error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                   helperText={formik.touched.last_name && formik.errors.last_name}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="email"
                   name="email"
                   label="Correo electrónico"
                   value={formik.values.email}
                   onChange={formik.handleChange}
                   error={formik.touched.email && Boolean(formik.errors.email)}
                   helperText={formik.touched.email && formik.errors.email}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="password"
                   name="password"
                   label="Contraseña"
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
                   id="passwordConfirm"
                   name="passwordConfirm"
                   label="Confirmar contraseña"
                   type="password"
                   value={formik.values.passwordConfirm}
                   onChange={formik.handleChange}
                   error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                   helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="phone_number"
                   name="phone_number"
                   label="Número Telefónico (opcional)"
                   value={formik.values.phone_number}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="address_line1"
                   name="address_line1"
                   label="Dirección linea 1 (opcional)"
                   value={formik.values.address_line1}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="address_line2"
                   name="address_line2"
                   label="Dirección linea 2 (opcional)"
                   value={formik.values.address_line2}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="city"
                   name="city"
                   label="Ciudad (opcional)"
                   value={formik.values.city}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="state"
                   name="state"
                   label="Provincia (opcional)"
                   value={formik.values.state}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="postal_code"
                   name="postal_code"
                   label="Codigo postal (opcional)"
                   value={formik.values.postal_code}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="country"
                   name="country"
                   label="Pais (opcional)"
                   value={formik.values.country}
                   onChange={formik.handleChange}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="billing_addres"
                   name="billing_addres"
                   label="Dirección de facturación (opcional)"
                   value={formik.values.billing_addres}
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
                    label="Quiero recibir notificaciones vía correo electrónico."
                  />
                </Grid>
              </Grid>
              
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    ¿Ya tienes una cuenta? Inicia sesión
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
            Registrarse
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
