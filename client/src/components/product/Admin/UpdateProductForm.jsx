import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase, { storage } from '../../../firebase';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CircularProgress, List, ListItem, ListItemIcon, ListItemText, Checkbox, Container, IconButton, TextField, Typography, Button, Switch, FormControlLabel } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { DeleteForever } from '@material-ui/icons';
import { useStylesUpdateProduct } from './styles/UpdateProductForm';
import { getProduct, getCategories } from '../../../redux/updateProductForm/actions';

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
        .required('Discount is required'),
    featured: yup
        .boolean('Mark if product is featured'),
  });

const UpdateProductForm = (props) => {
    const styles = useStylesUpdateProduct();
    const dispatch = useDispatch();
    const product = useSelector(state => state.updateProductReducer.product);
    const categories = useSelector(state => state.updateProductReducer.categories);
    const { match: { params: { id }}} = props;
    const [ images, setImages ] = useState([]);
    const [ imageToShow, setImageToShow ] = useState(true);
    const [ checked, setChecked ] = useState([]);
    const [ setCategoryList ] = useState([]);
    const [ loadingProduct, setLoadingProduct ] = useState(true);
    const userRole = sessionStorage.getItem('role');

    const handleDelete = imageToDelete => {
        product.image = product.image.filter(image => image !== imageToDelete);
        setImages(images.filter(image => image !== imageToDelete))
    }

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newCategory = product.categories.filter(category => category.id === value.id);
        const newChecked = [...checked];
        let arr = [];

        if (newCategory.length === 0) {
            newChecked.push(value);
            newChecked.forEach(el => arr.push(el.id));
        } else {
            newChecked.splice(currentIndex, 1);
            arr = [];
            newChecked.forEach(el => !arr.includes(el) && arr.push(el.id));
        }
        setChecked(newChecked);
        return setCategoryList(arr);
    };

    useEffect(() => {
        dispatch(getProduct(id));
        dispatch(getCategories());
    }, [dispatch, id]);

    

    const formik = useFormik({
        initialValues: {
            id: id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            discount: product.discount,
            featured: product.featured,
            image: product.image,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (!imageToShow) {
                const uploadImage = firebase.storage().ref().child(`/products/images/${product.name}/${images[0].name}`).put(images[0]);
                uploadImage.on (
                    "state_changed",
                    snapshot => {},
                    error => {console.log(error)},
                    async () => {
                        await storage
                            .ref(`/products/images/${product.name}/`)
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
            resetForm({values: ''});
            alert('Product updated');
        }
    });

    useEffect(() => {
        formik.values.name = product.name;
        formik.values.price = product.price;
        formik.values.description = product.description;
        formik.values.stock = product.stock;
        formik.values.discount = product.discount;
        formik.values.featured = product.featured;
        formik.values.image = product.image;
        setChecked(product.categories);
        setImages(product.image);
        setTimeout(() => {
            setLoadingProduct(false);
        }, 1000);
    },[product, formik.values.description, formik.values.discount, formik.values.featured,
       formik.values.image, formik.values.name, formik.values.price, formik.values.stock]);

    const form = () => {
        return (
            <form onSubmit={formik.handleSubmit} className={styles.form} >
                <Container>
                    <Typography align='center' variant='h4' >Update Product Form</Typography>
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
                    <List>
                        <Typography variant="h5">Categories</Typography>                      
                        {categories?.map(category => {    
                                const labelId = `checkbox-list-label-${category.id}`;
                                return product.categories?.filter(el => el.id === category.id).length === 1 ? (
                                    <ListItem key={category.id} role={undefined} dense button onChange={handleToggle(category)}>
                                        <ListItemIcon>
                                            <Checkbox 
                                                color="primary"
                                                edge="start"
                                                size="small"
                                                defaultChecked
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={category.id} value={category.id} primary={`category ${category.name} - ${category.id} `} />
                                    </ListItem>
                                )
                                : (
                                    <ListItem key={category.id} role={undefined} dense button onChange={handleToggle(category)}>
                                        <ListItemIcon>
                                            <Checkbox 
                                                color="primary"
                                                edge="start"
                                                size="small"
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={category.id} value={category.id} primary={`category ${category.name} - ${category.id} `} />
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
                            />
                    <Container >
                        <Typography>Images</Typography>
                        <Container className={styles.imagesContainer} >
                            { product.image?.map(image => {
                                return (
                                    <Container key={image} className={styles.imageContainer} >
                                        <img src={image} alt={product.name} className={styles.img} />
                                        <IconButton onClick={() => handleDelete(image)} className={styles.trash} ><DeleteForever /></IconButton>
                                    </Container>
                                )
                            })}
                        </Container>
                    </Container>
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        filesLimit={3}
                        dropzoneText={"Drag and drop an image here or click"}
                        clearOnUnmount={true}
                        onChange={images => {
                            setImages(
                                images.map(image => Object.assign(image))
                            );
                        }}
                        onDelete={deletedImage => {
                            setImages(
                                images.filter(image => image.name !== deletedImage.name)
                            );
                        }} 
                    />
                    <Button className={styles.editButton} color="primary" variant="contained" fullWidth type="submit" >
                        Edit
                    </Button>
                </Container>
            </form>
        );
    }

    return userRole !== 'admin' ? '404 NOT FOUND' : loadingProduct ? <CircularProgress disableShrink className={styles.isLoading} /> : form();
};

export default UpdateProductForm;
