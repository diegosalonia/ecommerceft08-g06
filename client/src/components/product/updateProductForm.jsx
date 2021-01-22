import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import firebase, { storage } from '../firebase';
import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone';
import { Container, TextField, Typography, Button, CssBaseline, Switch, FormControlLabel } from '@material-ui/core';



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
        .required('asdlaskd'),
    featured: yup
        .boolean('Mark if product is featured'),
  });

  