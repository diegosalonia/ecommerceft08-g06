import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Link, Avatar, Button, TextField, } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useStylesUserProfile } from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../redux/userReducer/actions';
import { changePasswordAction } from '../../redux/passwordResetReducer/actions'
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

const UserProfile = () => {
    const [changePassword, setChangePassword] = useState(false)
    const [changeEmail , setChangeEmail] = useState(false)
    const [changePhoneNumber , setChangePhoneNumber] = useState(false)
    const [changeShippingAdress , setChangeShippingAdress] = useState(false)
    const [changeBillingAdress , setChangeBillingAdress] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    // const [newEmail , setNewEmail] = useState("")
    // const [newPhoneNumber , setNewPhoneNumber] = useState("")
    // const [newShippingAdress , setNewShippingAdress] = useState("")
    // const [newBillingAdress , setNewBillingAdress] = useState("")
    
    
    const dispatch = useDispatch()
    const row = useSelector(state => state.userLoggedReducer.user[0])
    const token = sessionStorage.getItem("token")
    const userId = sessionStorage.getItem("id")
    const classes = useStylesUserProfile();
    const userRole = sessionStorage.getItem('role');

    const showAlert = (message, time) => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: time,
        });
    };

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
         <Grid className={classes.formPassword}>
            <TextField
            type="Password"
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

    
    const formik = useFormik({
        initialValues:{
            email: row?.email,
            phone_number: row?.phone_number,
            shipping_address: row?.shipping_adress,
            billing_address: row?.billing_adress
        },
        onSubmit: (values) => {
            setChangePhoneNumber(false)
            setChangeShippingAdress(false)
            setChangeEmail(false)
            setChangeBillingAdress(false)
            dispatch(updateUser(token, values, userId))
            formik.resetForm()
            showAlert("user info updated", 2000)
            setTimeout(()=>{window.location.reload()}, 2000)
        }
    })

    useEffect(()=>{
        dispatch(getUser(token))
    },[]);

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
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangeEmail(!changeEmail)
                                            setChangePassword(false)}}
                                        >
                                        editar
                                        </Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Phone Number: {row?.phone_number || "sin agregar"}</Typography>
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangePhoneNumber(!changePhoneNumber)
                                            setChangePassword(false)}}
                                        >
                                        editar
                                        </Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>shipping Address: {row?.shipping_address || "sin agregar"}</Typography>
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangeShippingAdress(!changeShippingAdress)
                                            setChangePassword(false)
                                        }}
                                        >
                                        editar
                                        </Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Billing Address: {row?.billing_address || "sin agregar"}</Typography>
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangeBillingAdress(!changeBillingAdress) 
                                            setChangePassword(false)}} >
                                        editar
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Typography className={classes.info} variant="h6">
                                    <Link to="#" onClick={()=>{
                                                setChangePassword(!changePassword)
                                                setChangePhoneNumber(false)
                                                setChangeShippingAdress(false)
                                                setChangeEmail(false)
                                                setChangeBillingAdress(false)}}>quiero cambiar mi contraseña</Link>
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className={classes.cardEdit}>
                            <CardContent>
                                <Typography variant="h5">Edit your profile:</Typography>
                                <form className = {classes.form} onSubmit={formik.handleSubmit}>
                                    {
                                        changeEmail&&
                                        <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {
                                        changePhoneNumber&&
                                        <TextField
                                        id="phone_number"
                                        name="phone_number"
                                        label="Phone Number"
                                        variant="outlined"
                                        value={formik.values.phone_number}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {
                                        changeShippingAdress&&
                                        <TextField
                                        id="shipping_address"
                                        name="shipping_address"
                                        label="Shipping Address"
                                        variant="outlined"
                                        value={formik.values.shipping_adress}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {
                                        changeBillingAdress&&
                                        <TextField
                                        id="billing_address"
                                        name="billing_address"
                                        label="Billing Address"
                                        variant="outlined"
                                        value={formik.values.billing_adress}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {(changeEmail || changePhoneNumber || changeShippingAdress || changeBillingAdress) && 
                                    <Grid className={classes.formButton}>
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth 
                                    >
                                        Submit
                                    </Button>
                                    </Grid>
                                    }
                                </form>
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