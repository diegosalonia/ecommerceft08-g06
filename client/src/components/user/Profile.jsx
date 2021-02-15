import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Link, Avatar, Button, TextField, } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useStylesUserProfile, useStylesChangePassword } from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../redux/userReducer/actions';
import { useFormik } from 'formik';
import { changePasswordAction } from '../../redux/passwordResetReducer/actions'
import * as yup from 'yup';
import Swal from 'sweetalert2';

const UserProfile = () => {
    const [changePassword, setChangePassword] = useState(false)
    const [changeEmail , setChangeEmail] = useState(false)
    const [changePhoneNumber , setChangePhoneNumber] = useState(false)
    const [changeShippingAdress , setChangeShippingAdress] = useState(false)
    const [changeBillingAdress , setChangeBillingAdress] = useState(false)
    
    const dispatch = useDispatch()
    const row = useSelector(state => state.userLoggedReducer.user[0])
    const token = sessionStorage.getItem("token")
    const userId = sessionStorage.getItem("id")
    const classes = useStylesUserProfile();
    const classesPassword = useStylesChangePassword();
    const userRole = sessionStorage.getItem('role');


    const numericRegex = /(?=.*[0-9])/
    const lowerCaseRegex = /(?=.*[a-z])/
    const upperCaseRegex = /(?=.*[A-Z])/

    const validationSchema = yup.object({
      newPassword: yup 
        .string("Ingresa una contraseña")
        .min(8, "Debe tener minimo 8 caracteres")
        .matches(numericRegex, "Debe tener minimo un numero")
        .matches(lowerCaseRegex, "Debe tener minimo una minuscula")
        .matches(upperCaseRegex, "Debe tener minimo una mayuscula"),
      passwordVerify: yup
        .string("Confirma tu contraseña")  
        .oneOf([yup.ref("newPassword")], "Las contraseñas no son iguales"),
      email: yup
        .string("Ingresa tu correo electronico")
        .email("Debes ingresar un correo electronico valido")
        .required("Debes ingresar un correo electronico"),
    })
    
    const formik = useFormik({
        initialValues:{
                email: "",
                phone_number: "",
                shipping_address: "",
                billing_address: "",
                newPassword: "",
                passwordVerify: ""

        },
        validationSchema: validationSchema,

        onSubmit: (values) => {
            if(changePassword){
                dispatch(changePasswordAction(token, userId, values.newPassword))
            }else{
                const form = {}
                changeEmail&&Object.assign(form, {email:values.email})
                changePhoneNumber&&Object.assign(form, {phone_number:parseInt(values.phone_number, 10)})
                changeShippingAdress&&Object.assign(form, {shipping_address:values.shipping_address})
                changeBillingAdress&&Object.assign(form, {billing_address:values.billing_address})
               dispatch(updateUser(token, form, userId))
               formik.resetForm()
            }
        }
    })

    useEffect(()=>{
        dispatch(getUser(token))
    },[]);

    const ChangePasswordForm = ()=>{
            
        
    return(
     <form className={classesPassword.formPassword} onSubmit={formik.handleSubmit}>
        <TextField
        type="Password"
        id="newPassword"
        name="newPassword"
        label="nueva contraseña"
        variant="outlined"
        className={classesPassword.password}
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
        <TextField
        type="Password"
        id="passwordVerify"
        name="passwordVerify"
        label="verifica tu contraseña"
        variant="outlined"
        className={classesPassword.password}
        value={formik.values.passwordVerify}
        onChange={formik.handleChange}
        error={formik.touched.passwordVerify && Boolean(formik.errors.passwordVerify)}
        helperText={formik.touched.passwordVerify && formik.errors.passwordVerify}
        />
        <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        className={classesPassword.button}
        >
            enviar
        </Button>
    </form>
    )
    }

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
                                        <Typography variant="h5" className={classes.info}>Datos personales:</Typography>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Correo electronico: {row?.email}</Typography>
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
                                        <Typography variant="h5" className={classes.info}>Numero de telefono: {row?.phone_number || "sin agregar"}</Typography>
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
                                        <Typography variant="h5" className={classes.info}>Dirrecion de envio: {row?.shipping_address || "sin agregar"}</Typography>
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
                                        <Typography variant="h5" className={classes.info}>Direccion de facturacion: {row?.billing_address || "sin agregar"}</Typography>
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
                                <Typography variant="h5">Edita tus datos personales:</Typography>
                                <form className = {classes.form} onSubmit={formik.handleSubmit}>
                                    {
                                        changeEmail&&
                                        <TextField
                                        id="email"
                                        name="email"
                                        label="correo electronico"
                                        variant="outlined"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        />
                                    }
                                    {
                                        changePhoneNumber&&
                                        <TextField
                                        id="phone_number"
                                        name="phone_number"
                                        label="telefono"
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
                                        label="direccion de envio"
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
                                        label="direccion de facturacion"
                                        variant="outlined"
                                        value={formik.values.billing_adress}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {(changeEmail || changePhoneNumber || changeShippingAdress || changeBillingAdress) && (
                                    (changeEmail && !formik.values.email.length) || 
                                    (changePhoneNumber && !formik.values.phone_number.length) || 
                                    (changeShippingAdress && !formik.values.shipping_address.length) ||
                                    (changeBillingAdress && !formik.values.billing_address.length)?
                                    <Grid className={classes.formButton}>
                                    <Button
                                    disabled
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth 
                                    >
                                        enviar
                                    </Button>
                                    </Grid>:
                                    <Grid className={classes.formButton}>
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth 
                                    >
                                        enviar
                                    </Button>
                                    </Grid>)
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