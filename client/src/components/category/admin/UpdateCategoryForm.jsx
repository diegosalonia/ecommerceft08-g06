import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Typography, Button, Container, CircularProgress, IconButton } from '@material-ui/core';
import { useStylesUpdateCategory } from './styles/UpdateCategory';
import { getCategoryOne , updateCategory , deleteImage} from '../../../redux/updateCategoryForm/actions'
import Swal from 'sweetalert2';
import { DeleteForever } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';

const validationSchema = yup.object({
    name: yup
        .string('Enter product name')
        .required('Product name is required'),
    description: yup
        .string('Enter product description'),
  });

const UpdateCategoryForm = (props) => {
    const styles = useStylesUpdateCategory();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.updateCategory.category);
    const { match: { params: { id }}} = props;
    const [ images, setImages ] = useState("");
    const [ loadingCategory, setLoadingCategory ] = useState(true);
    const userRole = sessionStorage.getItem('role');
    const token = sessionStorage.getItem('token');

    const handleDelete = imageToDelete => {
        dispatch(deleteImage(imageToDelete, token))
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

    const formik = useFormik({
        initialValues: {
            id: id,
            name: categories.name,
            description: categories.description,
            image: categories.image 
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            dispatch(updateCategory(values, images, token, id));
            showAlert();
        }
    });

    useEffect(()=>{
        dispatch(getCategoryOne(id));
    },[dispatch, id])

    useEffect(()=>{
        formik.values.name = categories.name;
        formik.values.description = categories.description;
        formik.values.image = categories.image;        
        setImages(categories.image);
        setTimeout(() => {
            setLoadingCategory(false);
        }, 2000);
    },[ categories ])

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
                            {
                                categories.image  ? 
                                <img src={categories.image} alt={categories.name} className={styles.img}/>                                
                                : <Typography>No hay imagenes</Typography> 
                            }
                            <IconButton onClick={() => handleDelete(categories.image)} className={styles.trash} ><DeleteForever/></IconButton>

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

