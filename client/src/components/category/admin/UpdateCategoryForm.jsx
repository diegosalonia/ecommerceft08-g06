import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import firebase, { storage } from '../../../firebase';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Typography, Button, Container, CircularProgress, IconButton } from '@material-ui/core';
import { useStylesUpdateCategory } from './styles/UpdateCategory';
import { getCategoryOne } from '../../../redux/updateCategoryForm/actions'
import { config } from '../../../redux/constants'
import Swal from 'sweetalert2';
import { DeleteForever } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';

const validationSchema = yup.object({
    name: yup
        .string('Enter product name').required('Product name is required'),
    description: yup
        .string('Enter product description'),
  });

const UpdateCategoryForm = (props) => {
    const styles = useStylesUpdateCategory();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.updateCategory.category);
    console.log(categories)
    const { match: { params: { id }}} = props;
    const [ images, setImages ] = useState([]);
    const [ imageToShow, setImageToShow ] = useState(true);
    const [ loadingCategory, setLoadingCategory ] = useState(true);
    const userRole = sessionStorage.getItem('role');
    const token = sessionStorage.getItem('token');

    const handleDelete = imageToDelete => {
        categories.image = categories.image.filter(image => image !== imageToDelete);
        setImages(images.filter(image => image !== imageToDelete))
    }

    const showAlert = () => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Producto editado!',
            showConfirmButton: false,
            timer: 2000,
        });
    };

    useEffect(()=>{
        dispatch(getCategoryOne(id));
    },[dispatch, id])

    const formik = useFormik({
        initialValues : {
            id : id,
            name : categories.name,
            description : categories.description,
            image : categories.image 
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            if(!imageToShow){
                const uploadImage = firebase.storage().ref().child(`/category/images/${categories.name}/${images[0].name}`).put(images[0]);
                uploadImage.on (
                    "state_changed",
                    snapshot => {},
                    error => {console.log(error)},
                    async () => {
                        await storage
                        .ref(`/categories/images/${categories.name}/`)
                        .child(images[0].name)
                        .getDownloadURL()
                        .then(url=>{
                            axios.put(`http://localhost:3000/category/${id}`, {form: {...values, image: url}} , config(token))
                                .then(res => console.log("res axios.put: ", res))
                                .catch(err => console.log("err axios.put: ", err));
                        })
                    }
                )
            }else{
                axios.put(`http://localhost:3000/category/${id}`, {form: values} , config(token))
                    .then(res => console.log("res axios.put: ", res))
                    .catch(err => console.log("err axios.put: ", err));
            }
            resetForm({values: ''});
            showAlert();
        }
    })

    useEffect(()=>{
        formik.values.name = categories.name;
        formik.values.description = categories.description;
        formik.values.image = categories.image;
        setImages(categories.image);
        setTimeout(() => {
            setLoadingCategory(false);
        }, 2000);
    },[categories, formik.values.name, formik.values.description, formik.values.image])

    const form = () =>{
        return (
            <form onSubmit={formik.handleSubmit}  className={styles.form} >
                <Container>
                    <Typography  align='center' variant='h4'>Actualizacion de Categoria</Typography>                  
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
                        id="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <Container>
                        <Typography>Images</Typography>
                        <Container className={styles.imagesContainer}>
                            <img src={categories.image} alt={categories.name}  />
                            <IconButton onClick={() => handleDelete(categories.image)} className={styles.trash} ><DeleteForever/></IconButton>
                            {/* {
                                categories.image?.map(image => {
                                    return (
                                        <Container key={image}  >
                                            <img src={image} alt={categories.name}  />
                                            <IconButton onClick={() => handleDelete(image)} ><DeleteForever/></IconButton>
                                        </Container>
                                    )
                                })
                            } */}
                        </Container>
                    </Container>
                    <DropzoneArea 
                        acceptedFiles={['image/*']}
                        filesLimit={1}
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
                    <Button className={styles.editButton} color="primary" variant="contained" fullWidth type="submit">
                        Editar
                    </Button>
                </Container>
            </form>
        )
    }
    return userRole !== 'admin' ? '404 ERROR' : loadingCategory ? <CircularProgress  disableShrink className={styles.isLoading}/> : form();

}

export default UpdateCategoryForm;

