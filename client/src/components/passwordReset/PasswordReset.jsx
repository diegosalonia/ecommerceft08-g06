import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography, Grid, Link } from '@material-ui/core';
import { resetPassword } from '../../redux/passwordResetReducer/actions';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { UseStylesResetPassword } from './styles'
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios'
import * as yup from 'yup';



const PasswordReset = () => {
    const dispatch = useDispatch();
    const [verifyCode, setVerifyCode] = useState(false)
    const [state, setState] = useState("")
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")

    const numericRegex = /(?=.*[0-9])/
    const lowerCaseRegex = /(?=.*[a-z])/
    const upperCaseRegex = /(?=.*[A-Z])/

    const validationSchema = yup.object({
      newPassword: yup 
        .string("Ingresa una contraseña")
        .required("Debes ingresar una contraseña")
        .min(8, "Debe tener minimo 8 caracteres")
        .matches(numericRegex, "Debe tener minimo un numero")
        .matches(lowerCaseRegex, "Debe tener minimo una minuscula")
        .matches(upperCaseRegex, "Debe tener minimo una mayuscula"),
      confirmPassword: yup
        .string("Confirma tu contraseña")  
        .oneOf([yup.ref("newPassword")], "Las contraseñas no son iguales")
        .required("Debes confirmar tu contraseña")
    })

    const formik = useFormik({
        initialValues:{
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(resetPassword(email, values.newPassword))
            setTimeout(()=>setState("succesfull"), 2000)
        }
    })

    const classes = UseStylesResetPassword()

    const handleReset = () => {
        window.location.reload()
    }

    const handleChange = (event) => {
        setEmail(event.target.value)
    }

    const handleChangeCode = (event) => {
        setCode(event.target.value)
    }

    const showAlertSuccess = (message, time) => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: time,
        });
      };

    const showAlertConflict = (message, time) => {
        return Swal.fire({
            position: 'center',
            icon: 'warning',
            title: message,
            showConfirmButton: false,
            timer: time,
        });
      };

    const handleSubmit = (event) =>{
        axios.post('http://localhost:3000/users/sendMail', {email})
        .then(response =>{
            showAlertSuccess(response.data.msg, 1500)
            setVerifyCode(true)
        })
        .catch(error =>{
            showAlertConflict(error.response.data.msg, 1500)
        })
    }
    const handleSubmitCode = (event) =>{
        axios.get(`http://localhost:3000/users/${code}/email/${email}`)
        .then(response => {
            showAlertSuccess(response.data.msg, 1500)
            setState("password")
        })
        .catch(error =>{
            showAlertConflict(error.response?.data.msg , 1500)
        })
    }

    const InsertEmail = () => {
        return(
            <Container className={classes.container}>
                <Grid className={classes.title}>
                    <Typography variant="h3">Restablecimiento de contraseña</Typography>
                    </Grid>
                    <Grid className={classes.paragraph}>
                       <Typography variant="h5" align="center">
                       Pon la dirección de correo electrónico que usaste para registrarte. Te enviaremos un mensaje con un codigo de verificacion para restablecer tu contraseña.
                       </Typography>
                       </Grid>
                       <Grid className={classes.inputContainer}>
                       <TextField
                          variant="outlined"
                          id="email"
                          name="email"
                          label="correo electronico"
                          onChange={handleChange}
                          value={email}
                          size="small"
                          className={classes.input}
                        />
                        <Button
                           type="submit"
                           variant="contained"
                           color="primary"
                           onClick={handleSubmit}>
                            enviar
                        </Button>
                        </Grid>
        </Container>
        )
    }
    const InsertCode = () => {
        return(
            <Container className={classes.container}>
                <Grid className={classes.title}>
                <Typography variant="h5">Inserte su codigo de verificacion:</Typography>
                </Grid>
                <Grid className={classes.inputContainer}>
                <TextField
                   variant="outlined"
                   id="verifyCode"
                   name="verifyCode"
                   label="codigo de verificacion"
                   onChange={handleChangeCode}
                   value={code}
                   size="small"
                   className={classes.inputCode}
                 />
                 <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitCode}>
                     enviar
                 </Button>
                <Grid >
                    <Grid className={classes.link}>
                      <Typography>no te llego el codigo?, 
                      <Link onClick={handleSubmit}>volver a enviar codigo</Link>
                      </Typography>
                    </Grid>
                    <Grid className={classes.link}>
                      <Typography>
                      <Link onClick={handleReset}>cambiar direccion de correo</Link>
                      </Typography>
                    </Grid>

                </Grid>
                </Grid>
        </Container>
        )
    }

    const InsertPassword = () => {

        return(
            <Container className={classes.container}>
                <Grid className={classes.title}>
                <Typography variant="h5">Inserte su nueva contraseña</Typography>
                </Grid>
                <form className={classes.container} onSubmit={formik.handleSubmit}>
                <Grid className={classes.inputContainer}>
                <TextField
                   size="small"
                   type="password"
                   variant="outlined"
                   id="newPassword"
                   name="newPassword"
                   label="nueva contraseña"
                   value={formik.values.newPassword}
                   onChange={formik.handleChange}
                   className={classes.inputPassword}
                   error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                   helperText={formik.touched.newPassword && formik.errors.newPassword}
                 />
                 </Grid>
                 <Grid className={classes.inputContainer}>
                <TextField
                   size="small"
                   type="password"
                   variant="outlined"
                   id="confirmPassword"
                   name="confirmPassword"
                   label="confirma tu contraseña"
                   value={formik.values.confirmPassword}
                   onChange={formik.handleChange}
                   className={classes.inputPassword}
                   error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                   helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                 />
                 </Grid>
                 <Grid>
                 <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary">
                     enviar
                 </Button>
                 </Grid>
                 </form>
        </Container>
        )
    }

    return(
        <div>
        {state==="password"?InsertPassword():!verifyCode?InsertEmail():InsertCode()}
        {state==="succesfull"&&<Redirect to="/"/>}
        </div>
    )
}

export default PasswordReset