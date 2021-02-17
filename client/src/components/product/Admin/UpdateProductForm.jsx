import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { CircularProgress, List, ListItem, ListItemIcon, ListItemText, Checkbox, 
         Container, IconButton, TextField, Typography, Button, Switch, 
         FormControlLabel } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { DeleteForever } from '@material-ui/icons';
import { useStylesUpdateProduct } from './styles/UpdateProductForm';
import { getProduct, getCategories, deleteImage, editProduct, deleteCategory, addCategory } from '../../../redux/updateProductForm/actions';

const validationSchema = yup.object({
    name: yup
        .string('Ingresa el nombre del producto')
        .required('El nombre del producto es requerido'),
    price: yup
        .number('Ingresa el precio del producto')
        .required('El precio del producto es requerido')
        .positive('Precio debe ser positivo'),
    description: yup
        .string('Ingrese una descripción para su producto'),
    stock: yup
        .number('Ingresa el stock del producto')
        .required('El stock del producto es requerido')
        .positive('Stock debe ser positivo'),
    discount: yup
        .number('Ingrsa el descuento de tu producto'),
    featured: yup
        .boolean('Marca el cuadro para dejar el producto como destacado'),
  });

const UpdateProductForm = (props) => {
    const styles = useStylesUpdateProduct();
    const dispatch = useDispatch();
    const product = useSelector(state => state.updateProductReducer.product);
    const categories = useSelector(state => state.updateProductReducer.categories);
    const { match: { params: { id }}} = props;
    const [ images, setImages ] = useState([]);    
    const [ checked, setChecked ] = useState([]);    
    const [ loadingProduct, setLoadingProduct ] = useState(true);
    const userRole = sessionStorage.getItem('role');
    const token = sessionStorage.getItem('token');
    
    const handleToggle = value => () => {
        if (checked.includes(value.id)) {
            setChecked(checked.filter(el => el !== value.id));
            dispatch(deleteCategory(id, value.id, token));
        } else {
            setChecked(checked.concat(value.id));
            dispatch(addCategory(id, value.id, token));
        }
    };

    const handleDelete = imageToDelete => {
        product.image = product.image.filter(image => image !== imageToDelete);
        setImages(images.filter(image => image !== imageToDelete));
        dispatch(deleteImage(imageToDelete, token));
    }

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
            dispatch(editProduct(values, images, checked.map(el => el.id), token, id));
            resetForm();
        }
    });

    useEffect(() => {
        dispatch(getProduct(id));
        dispatch(getCategories());
    }, [dispatch, id]);

    useEffect(() => {
        formik.values.name = product.name;
        formik.values.price = product.price;
        formik.values.description = product.description;
        formik.values.stock = product.stock;
        formik.values.discount = product.discount;
        formik.values.featured = product.featured;
        formik.values.image = product.image;
        setChecked(product.categories?.map(el => el.id));
        setImages(product.image);
        setTimeout(() => {
            setLoadingProduct(false);
        }, 1000);
    },[ product ]);

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
                                return product.categories?.filter(el => el.id === category.id).length === 1 ?(
                                    <ListItem key={category.id} role={undefined} dense button onChange={handleToggle(category)} >
                                        <ListItemIcon>
                                            <Checkbox 
                                                color="primary"
                                                edge="start"
                                                size="small"
                                                defaultChecked
                                                // checked={checked.indexOf(category) !== -1}
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
                                                checked={checked.indexOf(category.id) !== -1}
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
