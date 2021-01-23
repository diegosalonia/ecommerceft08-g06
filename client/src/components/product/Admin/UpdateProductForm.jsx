import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import firebase, { storage } from '../../firebase';
// import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone';
import { Container, Backdrop, CircularProgress, TextField, Typography, Button, CssBaseline, Switch, FormControlLabel } from '@material-ui/core';
import { getProduct } from '../utils';


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

function UpdateProductForm(props) {
    const { match: { params: { id }}} = props;
    const [ product, setProduct ] = useState();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ images, setImages ] = useState();
    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getProduct(id).then(res => {
            setProduct(res.data)
            setIsLoading(false);
            console.log("PRODUCT: ", res.data);
        })
        .catch(err => console.log("err", err));
    }, []);

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            price: '',
            description: '',
            stock: '',
            discount: '',
            featured: false,
            image: [],
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values);
        }
    })
    


    const handleClose = () => { setOpen(!open) };

    return (
        isLoading ? <Container>
                        <Backdrop open={open} onClick={handleClose}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Container>
                  : <Container>
                        <Typography>Update Product Form</Typography>
                        <TextField
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
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            initialFiles={product?.image}
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
    );
};

export default UpdateProductForm;
