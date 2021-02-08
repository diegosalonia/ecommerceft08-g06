import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { sendEmail, resetPassword } from '../../redux/passwordResetReducer/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PasswordReset = () => {
    const dispatch = useDispatch();
    const verifyCode = useSelector(state => state.passwordResetReducer.verifyCode)
    const [state, setState] = useState("")
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [newPassword, setNewPassword] = useState("");

    const UseStylesResetPassword = makeStyles(theme => ({
        container:{
            display:"flex",
            alignItems:"center"
        }
    }))
    
    const classes = UseStylesResetPassword()

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
                <Typography variant="h5">Inserte su email:</Typography>
                <TextField
                   autoComplete
                   variant="outlined"
                   id="email"
                   name="email"
                   label="email"
                   onChange={handleChange}
                   value={email}
                 />
                 <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}>
                     enviar
                 </Button>
        </Container>
        )
    }
    const InsertCode = () => {
        return(
            <Container className={classes.container}>
                <Typography variant="h5">Inserte su codigo de verificacion:</Typography>
                <TextField
                   variant="outlined"
                   id="verifyCode"
                   name="verifyCode"
                   label="verify code"
                   onChange={handleChangeCode}
                   value={code}
                 />
                 <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitCode}>
                     enviar
                 </Button>
        </Container>
        )
    }

    const InsertPassword = () => {
        return(
            <Container className={classes.container}>
                <Typography variant="h5">Inserte su nueva contraseña</Typography>
                <TextField
                   variant="outlined"
                   id="password"
                   name="password"
                   label="password"
                   onChange={handleChangePassword}
                   value={newPassword}
                 />
                 <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitPassword}>
                     enviar
                 </Button>
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