import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Link, Avatar, Button, TextField, } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useStylesUserProfile } from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/userReducer/actions';
import { changePasswordAction } from '../../redux/passwordResetReducer/actions'


const UserProfile = () => {
    const dispatch = useDispatch()
    const [changePassword, setChangePassword] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const row = useSelector(state => state.userLoggedReducer.user[0])
    const token = sessionStorage.getItem("token")
    const userId = sessionStorage.getItem("id")
    const classes = useStylesUserProfile();
    const userRole = sessionStorage.getItem('role');

    const handleSubmitPassword = (event)=>{
        event.preventDefault()
        console.log(newPassword)
        alert("contraseña cambiada con exito")
        setNewPassword("")
        setChangePassword(false)
        dispatch(changePasswordAction(token, userId, newPassword))
    }

    const handleChangePassword = (event) => {
        setNewPassword(event.target.value)
    }

    const ChangePasswordForm = ()=>{
        return(
         <Grid>
            <TextField
            id="newpassword"
            name="newpassword"
            label="new password"
            variant="outlined"
            size="default"
            className={classes.password}
            value={newPassword}
            onChange={handleChangePassword}
            />
            <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={handleSubmitPassword}
            >
                enviar
            </Button>
        </Grid>
        )
    }

    useEffect(()=>{
        dispatch(getUser(token))
    },[dispatch, token]);

    const profile = () => {
        return (
            <Container classNmae={classes.container}>
                <Grid>
                    <Grid className={classes.nameContainer}>
                        <Avatar className={classes.large}>
                            <PersonIcon  className={classes.icon} fontSize="large"/>
                        </Avatar>
                        <Typography className={classes.name} variant="h4">{row?.first_name + " " + row?.last_name}</Typography>
                    </Grid>
                    <Grid className={classes.container}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>User info:</Typography>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Email: {row?.email}</Typography>
                                        <Button className={classes.editar} variant="outlined">editar</Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Phone Number: {row?.phone_number || "sin agregar"}</Typography>
                                        <Button className={classes.editar} variant="outlined">editar</Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>shipping Adress: {row?.shipping_adress || "sin agregar"}</Typography>
                                        <Button className={classes.editar} variant="outlined">editar</Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Billing Adress: {row?.billing_adress || "sin agregar"}</Typography>
                                        <Button className={classes.editar} variant="outlined">editar</Button>
                                    </Grid>
                                </Grid>
                                <Typography className={classes.info} variant="h6">
                                    <Link to="#" onClick={()=>setChangePassword(true)}>quiero cambiar mi contraseña</Link>
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className={classes.cardEdit}>
                            <CardContent>
                                {changePassword&&ChangePasswordForm()}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        )
    }

    return userRole === 'user' ? profile() : '404 NOT FOUND';
}

export default UserProfile;