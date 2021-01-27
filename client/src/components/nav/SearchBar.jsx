import React from 'react';
import { useFormik } from 'formik';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = () => {
  const formik = useFormik({
    initialValues:{
      input: ""
    },
    onSubmit:(value)=>{
      console.log(value)
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
