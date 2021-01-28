import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByKeyword } from '../../redux/searchBarReducer/actions'

const SearchBar = ({ setSearch }) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.searchBarReducer.products)

  const formik = useFormik({
    initialValues:{
      input: ""
    },
    onSubmit:(value)=>{
      dispatch(getProductsByKeyword(value.input))  
      setSearch({
       searching: true,
       keyword: value.input,
       products,
       change:false
      })
    },
  });

  const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%',
    },
    searchBar: {
      width: "300px",
      height: "100%",
      backgroundColor: theme.palette.primary.light
    },
    input:{
      width:"100%",
    }
  }));

const classes = useStyles();

useEffect(() => {
  console.log(products)

},[products])

    return(
      <div className ={classes.searchBar}>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField 
            fullWidth
            id = "input"
            name = "input"
            size = "small"
            autoComplete = "off"
            className = {classes.input}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon 
                  color="primary"/>
                </InputAdornment>
              ),
            }}
            placeholder = "¿Que estas buscando?"
            variant = "outlined"
            value = {formik.values.input}
            onChange = {formik.handleChange}
          />
        </form>
      </div>
    )}

export default SearchBar;
