import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {Button, TextField, CssBaseline, Container, makeStyles, Typography} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { storage } from "../firebase"
import firebase from "../firebase"

const validationSchema = yup.object({
  name: yup
    .string('Enter category name')
    .required('Category name is required')
    .min(4, 'Please enter category name (min 4 characters)'),
  description: yup
  .string('Enter category description'),
});

const CategoryForm = () => {

  const [images, setImages] = useState(false);

  const sendImages = () => {
    if (images){
      const uploadTask = firebase.storage().ref().child(`/category/images/${images[0].name}`).put(images[0]);
      uploadTask.on(
      
        "state_changed",
        snapshot => {},
        error => {console.log(error)},
        () => {
          storage
            .ref("category/images")
            .child(images[0].name)
            .getDownloadURL()
            .then(url => {console.log("Download url: ",url )})
        }
      )
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      parent_id: null,
      image: null
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios.post('http://localhost:3000/category/', {form:values})
      .then((res) => {
        console.log("Succes",res)
        console.log("Start image upload")
        
      })
      .catch(error => console.log("Error axios: ",error))
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
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => {
                //todo (Upload form on send, not just onchange, do forEach magic to upload multiple images)
                console.log('Files:', files)
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