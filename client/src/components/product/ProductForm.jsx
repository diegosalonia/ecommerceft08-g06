import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { Container, TextField, Typography, Button, CssBaseline, Switch, FormControlLabel } from '@material-ui/core';

import { useStylesProductForm } from './styles';

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

const ProductForm = () => {
    const [ images, setImages ] = useState([]);
    const style = useStylesProductForm();
    const formik = useFormik({
        initialValues: {
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
            console.log("values: ", values);
        }
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxFiles: 3,
        onDrop: acceptedImages => {
            setImages(
                acceptedImages.map(image => Object.assign(image, {
                    preview: URL.createObjectURL(image)
                }))
            );
        }
    })
    const previews = images.map(image => (
        <div key={image.name} >
            <div>
                <img className={style.previewImage} src={image.preview} alt={image.name} />
            </div>
        </div>
    ))

    // if (files[0]){
    //     const uploadTask = firebase.storage().ref().child(`/category/images/${files[0].name}`).put(files[0]);
    //     uploadTask.on(
        
    //       "state_changed",
    //       snapshot => {},
    //       error => {console.log(error)},
    //       () => {
    //         storage
    //           .ref("category/images")
    //           .child(files[0].name)
    //           .getDownloadURL()
    //           .then(url => {console.log("Download url: ",url )})
    //       }
    //     )
    //   }

    return (
        <div className={style.productForm}>
            {/* {console.log("formik: ", formik)} */}
            <form onSubmit={formik.handleSubmit} >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Typography component="h5" variant="h5">New Product</Typography>
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
                        className={style.formSwitch}
                    />
                    <div className={style.imageUpload} {...getRootProps()} >
                        <input {...getInputProps()} />
                        <p>Drop your product images here</p>
                    </div>
                    <div className={style.previewImageDiv} >{ previews }</div>
                </Container>
                <Button color="primary" variant="contained" fullWidth type="submit" >
                        Submit
                    </Button>
            </form>
        </div>
    );
};

export default ProductForm
