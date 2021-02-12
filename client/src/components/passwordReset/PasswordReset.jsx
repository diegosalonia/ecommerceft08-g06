import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography, Card, CardContent, Grid, Link } from '@material-ui/core';
import { sendEmail, resetPassword } from '../../redux/passwordResetReducer/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { UseStylesResetPassword } from './styles'

const PasswordReset = () => {
    const dispatch = useDispatch();
    const verifyCode = useSelector(state => state.passwordResetReducer.verifyCode)
    const [state, setState] = useState("")
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [newPassword, setNewPassword] = useState("");


    
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

    const handleChangePassword = (event) => {
        setNewPassword(event.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(email)
        console.log("este es",code)
        dispatch(sendEmail(email))
        alert("codigo enviado")
    }
    const handleSubmitCode = (event) =>{
        event.preventDefault()
        if(parseInt(code, 10) === verifyCode){
            setState("password")
            console.log("son iguales")
        }else{
            console.log("no son iguales")
            alert("el codigo ingresado es invalido")
        }
    }

    const handleSubmitPassword = (event) =>{
        event.preventDefault()
        console.log(event.target.value)
        dispatch(resetPassword(email, newPassword))
        alert("contraseña cambiada con exito")
        setState("succesfull")
    }

    useEffect(()=> {
        console.log(verifyCode)
    },[state,verifyCode])

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
                          label="email"
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
                   label="verify code"
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
                <Grid className={classes.inputContainer}>
                <TextField
                   type="password"
                   variant="outlined"
                   id="password"
                   name="password"
                   label="password"
                   onChange={handleChangePassword}
                   value={newPassword}
                   size="small"
                   className={classes.inputPassword}
                 />
                 <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitPassword}>
                     enviar
                 </Button>
                 </Grid>
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