import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { storage } from "../../../firebase";
import firebase from "../../../firebase";
import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone';
import { Container, TextField, Typography, Button, CssBaseline, Switch, FormControlLabel, ListItemIcon, List, ListItem,
Checkbox , ListItemText  } from '@material-ui/core';
import { useStylesProductForm } from '../styles';

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
        .number('Enter product discount'),  
    featured: yup
        .boolean('Mark if product is featured'),
  });

const CreateProductForm = () => {
    const style = useStylesProductForm();
    const [ images, setImages ] = useState([]);
    const [ categories, setCategories] = useState();
    const [checked, setChecked] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    
    

    useEffect(() => {
        console.log("loading..")
        axios.get('http://localhost:3000/category/all').then( res =>{
            return setCategories(res.data)
        })        
        .catch(error => console.log(error))  
    },[])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        let arr = [];

        if (currentIndex === -1) {
            newChecked.push(value);
            newChecked.forEach(e=> arr.push(e.id) )            
          }else {
            newChecked.splice(currentIndex, 1);
            arr = []
            newChecked.forEach(e=> arr.push(e.id) )
          } 
          setChecked(newChecked);
          console.log(arr)
          
          return setCategoryList(arr)
    }

    const conectionRelation = (productId) => {
        categoryList.forEach(category=>{
            axios.post(`http://localhost:3000/products/${productId}/category/${category}`)
            .then(res=>{
            console.log(res)
            })
            .catch(err=>{
             console.log(err)
            })
        })
    }

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
        onSubmit: async (values, { resetForm }) => {
            const promises = images.map(image => {
                return new Promise((resolve, reject) => {
                    const uploadImage = firebase.storage().ref().child(`/products/images/${values.name}/${image.name}`).put(image);
                    uploadImage.on (
                        "state_changed",
                        snapshot => {},
                        error => {reject(error)},
                        async () => {
                            await storage
                                .ref(`products/images/${values.name}/`)
                                .child(image.name)
                                .getDownloadURL()
                                .then(url => {
                                    resolve(formik.values.image.push(url));
                                });
                        }
                    )
               })
            })
            Promise.all(promises)
            .then(res => {
                axios.post('http://localhost:3000/products', {form: {...values, image: formik.values.image}})
                .then(res => {
                    console.log("RESPUESTA: ", res);
                    formik.values.featured = false;
                    formik.values.image = [];
                    conectionRelation(res.data.id); //Create category_product
                    resetForm({values: ''});
                    alert('Product created');
            })
            .catch(err => console.log(err));
        })
    }});

    return (
        <div className={style.productForm}>
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
                     <List className={style.vista}>
                        <Typography variant="h5">Categories</Typography>                      
                    { 
                        categories?.map((value)=>{

                            const labelId = `checkbox-list-label-${value.id}`;
                            return(
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
                        })
                    }
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
                        filesLimit={1}
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
                <Button color="primary" variant="contained" fullWidth type="submit" >
                        Submit
                    </Button>
            </form>
        </div>
    );
};

export default CreateProductForm;
