import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';




const validationSchema = yup.object({
  name: yup
    .string('Enter category name')
    .required('Category name is required')
    .min(1, 'Please enter category name'),
  description: yup
  .string('Enter category description'),

});

const CategoryForm = () => {
  const formik = useFormik({
    initialValues: {
      name: null,
      description: null,
      parent_id: null,
      image: null
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
     //Do something with values. 
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
            <Button color="primary" variant="contained" fullWidth type="submit" className={classes.submit}>
            Submit
            </Button>
        </Container>    
        
      </form>
    </div>
  );
};

export default CategoryForm;