import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {Button, TextField, CssBaseline, Container, makeStyles, Typography} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { storage } from "../../firebase"
import firebase from "../../firebase"
//ToDo: Clean console logs.
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

  useEffect(() => {
    if(images){
      console.log("images state: ", images)
    }
  }, [images])

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      parent_id: null,
      image: null
    },
    validationSchema: validationSchema,
    //SUBMIT CONTROL -----------------------------------------
    onSubmit:  (values) => {
      var formValues = {...values};
      axios.post('http://localhost:3000/category/', {form:values})
      .then((res) => {
        console.log("Succes",res);
        formValues.id = res.data.id;
        sendImages(images, formValues);
      })
      .catch(error => console.log("Error on request: ",error))
    },
  });
//STYLES-------------------------
  const useStyles = makeStyles((theme) => ({
    paper: {
      // marginTop: theme.spacing(8),
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

  //IMAGE CONTROL ------------------------------------------------- 
  const sendImages = (images, formval) => {
    if (images, formval){
      console.log("Start image upload");
      const uploadTask = firebase.storage().ref().child(`/category/${formval.name}/${images[0].name}`).put(images[0]);
      uploadTask.on(
      
        "state_changed",
        snapshot => {},
        error => {console.log(error)},
        () => {
          storage
            .ref(`category/${formval.name}`)
            .child(images[0].name)
            .getDownloadURL()
            .then(url => {console.log("Download url: ",url ); sendImgUrl(url, formval)})
        }
      )
    }
  }

  //IMAGE URL TO DATABASE
  const sendImgUrl = (url, formval) => {
    console.log(formval);
    const valuesToDb = {...formval};
    valuesToDb.image = url;
    console.log("Values to Db: ",valuesToDb);
      axios.put(`http://localhost:3000/category/${valuesToDb.id}`, {form:valuesToDb})
      .then((res) => {
        console.log("Succes, writed in db with img",res);
      })
      .catch(error => console.log("Error on request: ",error))
  }



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
              filesLimit= {1}
              dropzoneText={"Drag and drop image here or click"}
              onChange={(files) => {
                //todo (Upload form on send, not just onchange, do forEach magic to upload multiple images)
                console.log('Files:', files)
                setImages(files);
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