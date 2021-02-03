import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropzoneArea } from 'material-ui-dropzone';
import { Container, TextField, Typography, Button, CssBaseline, Switch, FormControlLabel, ListItemIcon, List, ListItem,
Checkbox , ListItemText, CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addProduct, getCategories } from '../../../redux/createProductReducer/actions';
import { useStylesProductForm } from '../styles';
import {Swal} from 'sweetalert2';

const validationSchema = yup.object({
    name: yup
        .string('Enter product name')
        .required('Product name is required'),
    price: yup
        .number('Enter product price')
        .required('Product price is required')
        .positive('Product price must be positive'),
    description: yup
        .string('Enter product description')
        .required('Product detail is required'),
    stock: yup
        .number('Enter stock quantity')
        .required('Product stock is required')
        .moreThan(-1),
    discount: yup
        .number('Enter product discount'),  
    featured: yup
        .boolean('Mark if product is featured'),
  });

const CreateProductForm = () => {
    const style = useStylesProductForm();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.createProductReducer.categories);
    const newProduct = useSelector(state => state.createProductReducer.newProduct);
    const [ checked, setChecked ] = useState([]);
    const [ categoryList, setCategoryList ] = useState([]);
    const [ images, setImages ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ alert, setAlert ] = useState(false);

    const showAlert = () => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product created succesfully!',
            showConfirmButton: false,
            timer: 2000,
        });
    };

    useEffect(() => {
        dispatch(getCategories());
    },[]);

    useEffect(() => {
        setLoading(false);
        setAlert(true);
    }, [newProduct]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        let arr = [];

        if (currentIndex === - 1) {
            newChecked.push(value);
            newChecked.forEach(el => arr.push(el.id));
        } else {
            newChecked.splice(currentIndex, 1);
            arr = [];
            newChecked.forEach(el => arr.push(el.id));
        }
        setChecked(newChecked);
          
        return setCategoryList(arr);
    };

    const formik = useFormik({
        initialValues: {
          name: '',
          price: '',
          description: '',
          stock: '',
          discount: 0,
          featured: false,
          image: []
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            setLoading(true);
            dispatch(addProduct(values, images, categoryList));
            showAlert();
        }
    });

    const form = () => {
        return (
            <div className={style.productForm}>
                <form onSubmit={formik.handleSubmit} >
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Typography align='center' component="h4" variant="h4">New Product</Typography>
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
                        <List className={style.vista}>
                            <Typography variant="h5">Categories</Typography>                      
                            {categories?.map(value => {    
                                    const labelId = `checkbox-list-label-${value.id}`;
                                    return (
                                        <ListItem key={value.id} role={undefined} dense button onChange={handleToggle(value)}>
                                            <ListItemIcon>
                                                <Checkbox 
                                                    color="primary"
                                                    edge="start"
                                                    size="small"
                                                    checked={checked.indexOf(value) !== -1}                                            
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={value.id} value={value.id} primary={`category ${value.name} - ${value.id} `} />
                                        </ListItem>
                                    );
                            })}
                        </List>
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
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            clearOnUnmount={true}
                            onChange={images => {
                                console.log('Images:', images)
                                setImages(images.map(image => Object.assign(image)));
                                }
                            }
                            onDelete={deletedImage => {
                                setImages(
                                    images.filter(image => image.name !== deletedImage.name)
                                );
                            }}
                        />
                    </Container>
                    <Button className={style.submitButton} color="primary" variant="contained" fullWidth type="submit" >
                            Submit
                        </Button>
                </form>
            </div>
        );
    }

    return !loading ? form() : <CircularProgress disableShrink className={style.isLoading} />;
};

export default CreateProductForm;
