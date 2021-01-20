import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
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
    // const { image, setImage } = useState();
    const formik = useFormik({
        initialValues: {
          name: '',
          price: '',
          description: '',
          stock: '',
          discount: '',
          featured: false,
          image: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {

        }
    });
    const style = useStylesProductForm();

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
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                     <TextField
                        fullWidth
                        id="price" 
                        name="price"
                        label="Price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
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
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        fullWidth
                        id="discount" 
                        name="discount"
                        label="Discount"
                        value={formik.values.discount}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
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
                    <div className={style.imageUpload}>
                        <label className={style.labelImage}>Image</label>
                        <input required id="file" name="file" className={style.inputImage} type="file" onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])}  />
                    </div>
                </Container>
                <Button color="primary" variant="contained" fullWidth type="submit" >
                        Submit
                    </Button>
            </form>
        </div>
    );
};

export default ProductForm
