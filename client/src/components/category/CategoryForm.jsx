import React, { useState } from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Button, TextField, CssBaseline, Container, makeStyles, Typography} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone';
// import AttachFileIcon from '@material-ui/icons/AttachFile';
import { storage } from "../firebase"
import firebase from "../firebase"
import axios from 'axios';


const validationSchema = yup.object({
  name: yup
    .string('Enter category name')
    .required('Category name is required')
    .min(4, 'Please enter category name (min 4 characters)'),
  description: yup
  .string('Enter category description'),
});

const CategoryForm = () => {
  const [ images, setImages ] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      parent_id: null,
      image: []
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
     //Do something with values and image uploads.
      images.forEach(image => {
        const uploadImage = firebase.storage().ref().child(`/category/images/${image.name}`).put(image);
        uploadImage.on (
            "state_changed",
            snapshot => {},
            error => {console.log(error)},
            async () => {
                await storage
                    .ref('category/images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        formik.values.image.push(url);
                    });
                
            }
        )
    });
    axios.post('http://localhost/3000/category/', {form: {...values, image: JSON.stringify(values.image)}})
      .then((res) => console.log("Respuesta: ",res))
      .catch(error => console.log("Error: ",error))
    },
  });

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();


  return (
    <div className={classes.paper}>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
      <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Typography component="h1" variant="h5">
                New Category
            </Typography>
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
            multiline
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            />
            <DropzoneArea
              acceptedFiles={['image/*']}
              filesLimit={3}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => {
                //todo (Upload form on send, not just onchange, do forEach magic to upload multiple images)
                // console.log('Files:', files)
                  setImages(
                    files.map(image => Object.assign(image))
                  );
                }
              }
              onDelete={deletedImage => {
                setImages(
                    images.filter(image => image.name !== deletedImage.name)
                );
              }}
            />
            <Button color="primary" variant="contained" fullWidth type="submit" className={classes.submit}>
            Submit
            </Button>
        </Container>    
        
      </form>
    </div>
  );
};

export default CategoryForm;