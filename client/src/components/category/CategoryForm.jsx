import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Button, TextField, CssBaseline, Container, makeStyles, Typography} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone'
import AttachFileIcon from '@material-ui/icons/AttachFile';



const validationSchema = yup.object({
  name: yup
    .string('Enter category name')
    .required('Category name is required')
    .min(4, 'Please enter category name (min 4 characters)'),
  description: yup
  .string('Enter category description'),
});

const CategoryForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      parent_id: null,
      image: null
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
     //Do something with values and image uploads. 
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
              onChange={(files) => console.log('Files:', files)}
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