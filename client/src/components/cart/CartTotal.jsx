import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Container,
  Typography,
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useStylesCartTotal } from "./styles";
import { goToCheckout } from "../../redux/cartReducer/actions";
import { addNewAddress } from "../../redux/loginReducer/actions";
import LoginModal from "../login/LoginModal";
import axios from "axios";
import * as yup from 'yup'
import Swal from 'sweetalert2'


const validationSchema = yup.object({
    email: yup
      .string('Ingresar Email.')
      .email('Ingrese un email válido.'),
    address_line1: yup
      .string('Ingresar dirección.')
      .required('la dirección es requerida.'),
    address_line2: yup
      .string('ingresar linea 2 de dirección (opcional).'),
    city: yup
      .string('Ingrese Ciudad.')
      .required('La ciudad es requerida.'),
    state: yup
      .string('Ingrese su Provincia.')
      .required('La provincia es requerida.'),
    postal_code: yup
      .number('Ingrese código postal.')
      .required('el código postal es requerido.'),
    country: yup
      .string('Ingrese el Pais')
  });


const CartTotal = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cartReducer.productsInCart);
  const styles = useStylesCartTotal();
  const [total, setTotal] = useState();
  const tax = total * (21 / 100);
  const userId = JSON.parse(sessionStorage.getItem("id"));
  const shippingAddress = useSelector(
    (state) => state.loginReducer.shipping_address
  );
  const [open, setOpen] = useState(false);
  const [noAddress, setNoAddress] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    !shippingAddress && setNoAddress(true);
  }, [shippingAddress]);

  useEffect(() => {
    userId &&
      setTotal(
        products.reduce(
          (acc, el) =>
            (acc +=
              (el.price - el.price * (el.discount / 100)) *
              el.order_line.quantity),
          0
        )
      );
    !userId &&
      setTotal(
        products.reduce(
          (acc, el) =>
            (acc += (el.price - el.price * (el.discount / 100)) * el.quantity),
          0
          )
          );
 }, [products, userId]);

  const handleCheckout = () => dispatch(goToCheckout(userId, products));

  const formik = useFormik({
    initialValues: {
      email: sessionStorage.getItem("email"),
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: null,
      country: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      var formValues = { ...values };
      axios
        .put(`http://localhost:3000/users/${userId}/shipping-address`, { form: values }, config)
        .then((res) => {
          console.log("Succes", res);
          formValues.id = res.data.id;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Datos actualizados',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((error) => console.log("Error on request: ", error));
    },
  });

  const addShippingAddress = () => {
    return (
      <Container className={styles.containerModal}>
        <Button onClick={handleOpen} className={styles.buttonConfirmAddress}>
          Añadir dirección de envío
        </Button>
        <Modal
          className={styles.modalContainer}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          disableAutoFocus
          disableEnforceFocus
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 2000 }}
        >
          <Fade in={open} className={styles.fadeComponent}>
            <form onSubmit={formik.handleSubmit} >
              <Container>
                  <Typography variant="h2" component="h2" align="center">Detalles para el envío</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      name="email"
                      label="email"
                      fullWidth
                      autoComplete="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="address_line1"
                      name="address_line1"
                      label="Dirección"
                      fullWidth
                      autoComplete="shipping address-line1"
                      value={formik.values.address_line1}
                      onChange={formik.handleChange}
                      error={formik.touched.address_line1 && Boolean(formik.errors.address_line1)}
                      helperText={formik.touched.address_line1 && formik.errors.address_line1}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="address_line2"
                      name="address_line2"
                      label="Dirección línea 2"
                      fullWidth
                      autoComplete="shipping address-line2"
                      value={formik.values.address_line2}
                      onChange={formik.handleChange}
                      error={formik.touched.address_line2 && Boolean(formik.errors.address_line2)}
                      helperText={formik.touched.address_line2 && formik.errors.address_line2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      name="city"
                      label="Ciudad"
                      fullWidth
                      autoComplete="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="state"
                      name="state"
                      label="Provincia"
                      fullWidth
                      autocomplete="State"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      error={formik.touched.state && Boolean(formik.errors.state)}
                      helperText={formik.touched.state && formik.errors.state}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="postal_code"
                      name="postal_code"
                      label="Código Postal"
                      fullWidth
                      autoComplete="shipping postal-code"
                      value={formik.values.postal_code}
                      onChange={formik.handleChange}
                      error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                      helperText={formik.touched.postal_code && formik.errors.postal_code}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="country"
                      name="country"
                      label="País"
                      fullWidth
                      autoComplete="shipping country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      error={formik.touched.country && Boolean(formik.errors.country)}
                      helperText={formik.touched.country && formik.errors.country}
                    />
                    
                  </Grid>
                  <Grid item xs={12}>
                      <Button color="primary" variant="contained" fullWidth type="submit" onClick={handleClose} >
                        Guardar
                    </Button>
                    </Grid>
                </Grid>
              </Container>
            </form>
            </Fade>
          </Modal>
        </Container>
    );
  };

  return (
    <Container className={styles.bigContainer}>
      <Container className={styles.container}>
        <Container className={styles.containerSubtotal}>
          <Typography>Subtotal</Typography>
          <Typography>{`$${total}`}</Typography>
        </Container>
        <Container className={styles.containerShipping}>
          <Typography>Shipping</Typography>
          <Typography>-</Typography>
        </Container>
        <Container className={styles.containerTax}>
          <Typography>Tax(IVA)</Typography>
          <Typography>{`$${tax.toFixed(2)}`}</Typography>
        </Container>
        <hr />
        <Container className={styles.containerTotal}>
          <Typography>Total</Typography>
          <Typography>{`$${(total + tax).toFixed(2)}`}</Typography>
        </Container>
      </Container>
      <Container className={styles.checkoutButton}>
        {userId && noAddress ? (
          addShippingAddress()
        ) : userId ? (
          <Button onClick={handleCheckout}>GO TO CHECKOUT</Button>
        ) : (
          <LoginModal inCart={true} />
        )}
      </Container>
    </Container>
  );
};

export default CartTotal;
