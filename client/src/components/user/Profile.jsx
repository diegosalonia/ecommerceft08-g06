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
    const [changeLineAdress1 , setChangeLineAdress1] = useState(false)
    const [changeLineAdress2 , setChangeLineAdress2] = useState(false)
    const [changeCity, setChangeCity] = useState(false)
    const [changeState, setChangeState] = useState(false)
    const [changePostalCode, setChangePostalCode] = useState(false)
    const [changeCountry, setChangeCountry] = useState(false)
    const [changeBillingAddres , setChangeBillingAddres] = useState(false)
    
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
    })
    
    const formik = useFormik({
        initialValues:{
                email: "",
                phone_number: "",
                address_line1: "",
                address_line2: "",
                city: "",
                state: "",
                postal_code: "",
                country: "",
                billing_addres: "",
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
                changeLineAdress1&&Object.assign(form, {address_line1:values.address_line1})
                changeLineAdress2&&Object.assign(form, {address_line2:values.address_line2})
                changeCity&&Object.assign(form, {city:values.city})
                changeState&&Object.assign(form, {state:values.state})
                changePostalCode&&Object.assign(form, {postal_code:parseInt(values.postal_code, 10)})
                changeCountry&&Object.assign(form, {country: values.country})
                changeBillingAddres&&Object.assign(form, {billing_addres:values.billing_addres})
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
                                        <Typography variant="h5" className={classes.info}>Dirrecion linea 1: {row?.address_line1 || "sin agregar"}</Typography>
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangeLineAdress1(!changeLineAdress1)
                                            setChangePassword(false)
                                        }}
                                        >
                                        editar
                                        </Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Dirrecion linea 2 : {row?.address_line2 || "sin agregar"}</Typography>
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangeLineAdress2(!changeLineAdress2)
                                            setChangePassword(false)
                                        }}
                                        >
                                        editar
                                        </Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Ciudad: {row?.city || "sin agregar"}</Typography>
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangeCity(!changeCity) 
                                            setChangePassword(false)}} >
                                        editar
                                        </Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Estado: {row?.state || "sin agregar"}</Typography>
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangeState(!changeState) 
                                            setChangePassword(false)}} >
                                        editar
                                        </Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Codigo postal: {row?.postal_code || "sin agregar"}</Typography>
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangePostalCode(!changePostalCode) 
                                            setChangePassword(false)}} >
                                        editar
                                        </Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Pais: {row?.country || "sin agregar"}</Typography>
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangeCountry(!changeCountry) 
                                            setChangePassword(false)}} >
                                        editar
                                        </Button>
                                    </Grid>
                                    <Grid className={classes.userInfo}>
                                        <Typography variant="h5" className={classes.info}>Direccion de facturacion: {row?.billing_addres || "sin agregar"}</Typography>
                                        <Button 
                                        className={classes.editar} 
                                        variant="outlined" 
                                        onClick={()=> {
                                            setChangeBillingAddres(!changeBillingAddres) 
                                            setChangePassword(false)}} >
                                        editar
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Typography className={classes.info} variant="h6">
                                    <Link to="#" onClick={()=>{
                                                setChangePassword(!changePassword)
                                                setChangePhoneNumber(false)
                                                setChangeLineAdress1(false)
                                                setChangeLineAdress2(false)
                                                setChangePostalCode(false)
                                                setChangeState(false)
                                                setChangeCity(false)
                                                setChangeCountry(false)
                                                setChangeEmail(false)
                                                setChangeBillingAddres(false)}}>quiero cambiar mi contraseña</Link>
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
                                        changeLineAdress1&&
                                        <TextField
                                        id="address_line1"
                                        name="address_line1"
                                        label="Direccion linea 1"
                                        variant="outlined"
                                        value={formik.values.address_line1}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {
                                        changeLineAdress2&&
                                        <TextField
                                        id="address_line2"
                                        name="address_line2"
                                        label="Direccion linea 2"
                                        variant="outlined"
                                        value={formik.values.address_line2}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {
                                        changeCity&&
                                        <TextField
                                        id="city"
                                        name="city"
                                        label="Ciudad"
                                        variant="outlined"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {
                                        changeState&&
                                        <TextField
                                        id="state"
                                        name="state"
                                        label="Estado"
                                        variant="outlined"
                                        value={formik.values.state}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {
                                        changePostalCode&&
                                        <TextField
                                        id="postal_code"
                                        name="postal_code"
                                        label="Codigo postal"
                                        variant="outlined"
                                        value={formik.values.postal_code}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {
                                        changeCountry&&
                                        <TextField
                                        id="country"
                                        name="country"
                                        label="direccion de envio"
                                        variant="outlined"
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {
                                        changeBillingAddres&&
                                        <TextField
                                        id="billing_addres"
                                        name="billing_addres"
                                        label="direccion de facturacion"
                                        variant="outlined"
                                        value={formik.values.billing_addres}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                        />
                                    }
                                    {(changeEmail || changePhoneNumber || changeLineAdress1 || changeLineAdress2 || 
                                    changeCity || changeState || changePostalCode || changeCountry || changeBillingAddres) && (
                                    (changeEmail && !formik.values.email.length) || 
                                    (changePhoneNumber && !formik.values.phone_number.length) || 
                                    (changeLineAdress1 && !formik.values.address_line1.length) ||
                                    (changeLineAdress2 && !formik.values.address_line2.length) ||
                                    (changeCity && !formik.values.city.length) ||
                                    (changeState && !formik.values.state.length) ||
                                    (changePostalCode && !formik.values.postal_code.length) ||
                                    (changeCountry && !formik.values.country.length) ||
                                    (changeBillingAddres && !formik.values.billing_addres.length)?
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
