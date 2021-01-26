import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DropzoneArea } from 'material-ui-dropzone';
import { makeStyles, Container, IconButton, TextField, Typography, Button, Switch, FormControlLabel } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import axios from 'axios';
import firebase, { storage } from '../../../firebase';

const validationSchema = yup.object({
    name: yup
        .string('Enter product name').required('Product name is required'),
    price: yup
        .number('Enter product price')
        .required('Product price is required')
        .positive('Product price must be positive'),
    description: yup
        .string('Enter product description'),
    stock: yup
        .number('Enter stock quantity')
        .required('Product stock is required')
        .positive('Stock must be positive'),
    discount: yup
        .number('Enter product discount')
        .required('asdlaskd'),
    featured: yup
        .boolean('Mark if product is featured'),
  });

const useStylesUpdateProduct = makeStyles({
    form: {
        maxWidth: '40%',
        margin: 'auto',
    },
    imageContainer: {
        display: 'flex'
    },
    img: {
        maxWidth: '150px',
        maxHeight: '150px'
    },
    trash: {
        alignSelf: 'baseline',
    },
})

function UpdateProductForm(props) {
    const { id, name, price, description, stock, discount, featured, image} = props.location.state;
    const [ images, setImages ] = useState([]);
    const styles = useStylesUpdateProduct();
    const [ imageToShow, setImageToShow ] = useState(true);
    console.log("Image: ", image);
    const formik = useFormik({
        initialValues: {
            id: id,
            name: name,
            price: price,
            description: description,
            stock: stock,
            discount: discount,
            featured: featured,
            image: image,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (!imageToShow) {
                const uploadImage = firebase.storage().ref().child(`/products/images/${name}/${images[0].name}`).put(images[0]);
                uploadImage.on (
                    "state_changed",
                    snapshot => {},
                    error => {console.log(error)},
                    async () => {
                        await storage
                            .ref(`/products/images/${name}/`)
                            .child(images[0].name)
                            .getDownloadURL()
                            .then(url => {
                                axios.put(`http://localhost:3000/products/${id}`, {form: {...values, image: url}})
                                    .then(res => console.log("res axios.put: ", res))
                                    .catch(err => console.log("err axios.put: ", err));
                            });
                    }
                )
            } else {
                axios.put(`http://localhost:3000/products/${id}`, {form: values})
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
            formik.values.featured = false;
            formik.values.image = [];
            resetForm({values: ''});
            alert('Product updated');
        }
    })


    const handleDelete = () => {
        setImageToShow(false);
    }

    useEffect(() => {}, [ handleDelete, formik.handleSubmit ]);

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form} >
            <Container>
                <Typography>Update Product Form</Typography>
                <TextField
                    disabled
                    fullWidth
                    id="id"
                    name="id"
                    label="ID"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                    error={formik.touched.id && Boolean(formik.errors.id)}
                    helperText={formik.touched.id && formik.errors.id}
                />
                <TextField 
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField 
                    fullWidth
                    id="price" 
                    name="price"
                    label="Price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    required
                />
                <TextField 
                    fullWidth
                    multiline
                    id="description" 
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <TextField 
                    fullWidth
                    id="stock" 
                    name="stock"
                    label="Stock"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    error={formik.touched.stock && Boolean(formik.errors.stock)}
                    helperText={formik.touched.stock && formik.errors.stock}
                />
                <TextField 
                    fullWidth
                    id="discount" 
                    name="discount"
                    label="Discount"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    error={formik.touched.discount && Boolean(formik.errors.discount)}
                    helperText={formik.touched.discount && formik.errors.discount}
                />
                <FormControlLabel
                            control={<Switch
                                        checked={formik.featured}
                                        onChange={formik.handleChange}
                                        name="featured"            
                                        value={formik.values.featured}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />}
                            labelPlacement="start"
                            label="Featured"
                        />
                <Container >
                    <Typography>Image</Typography>
                    { imageToShow && <Container className={styles.imageContainer} >
                                         <img src={image} alt={name} className={styles.img} />
                                         <IconButton color='secondary' onClick={() => handleDelete()} className={styles.trash} ><DeleteForever /></IconButton>
                                     </Container>}
                </Container>
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    filesLimit={3}
                    dropzoneText={"Drag and drop an image here or click"}
                    clearOnUnmount={true}
                    onChange={images => {
                        console.log('Images:', images)
                        setImages(
                            images.map(image => Object.assign(image))
                        );
                        }
                    }
                    onDelete={deletedImage => {
                        setImages(
                            images.filter(image => image.name !== deletedImage.name)
                        );
                    }} 
                />
                <Button color="primary" variant="contained" fullWidth type="submit" >
                    Edit
                </Button>
            </Container>
        </form>
    );
};

/* "["https://firebasestorage.googleapis.com/v0/b/un-jardin-especial.appspot.com/o/category%2Fimages%2FProduct.png?alt=media&token=5c304650-c254-49e1-86d4-50dc2613ff86"]" */

export default UpdateProductForm;
