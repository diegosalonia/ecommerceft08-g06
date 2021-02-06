import React, { useState } from 'react';
import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { sendEmail } from '../../redux/passwordResetReducer/actions';
import { useSelector, useDispatch } from 'react-redux';


const PasswordReset = () => {
    const dispatch = useDispatch();
    const verifyCode = useSelector(state => state.passwordResetReducer.verifyCode)
    const [state, setState] = useState("email")
    const [email, setEmail] = useState("")


    const UseStylesResetPassword = makeStyles(theme => ({
        container:{
            display:"flex",
            alignItems:"center"
        }
    }))
    
    const classes = UseStylesResetPassword()

    const handleChange = (event) => {
        event.preventDefault()
        setEmail(event.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(email)
        dispatch(sendEmail(email))
        
    }

    const InsertEmail = () => {
        return(
            <Container className={classes.container}>
             <CssBaseline/>
                <Typography variant="h5">Inserte su email:</Typography>
                <Grid>
                <TextField
                   variant="outlined"
                   id="email"
                   name="email"
                   label="email"
                   onChange={handleChange}
                   onSubmit={handleSubmit}
                   value={email}
                 />
                 </Grid>
                 <Button onClick={handleSubmit} >enviar</Button>
        </Container>
        )
    }

    return(
        <InsertEmail/>
    )
}

export default PasswordReset