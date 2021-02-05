import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByKeyword } from '../../redux/searchBarReducer/actions'
import { Redirect } from 'react-router-dom';


const SearchBar = () => {
  const [search, setSearch] = useState({
    searching: false,
    keyword: ""
  })
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues:{
      input: ""
    },
    onSubmit:(value)=>{
      dispatch(getProductsByKeyword(value.input))  
      setSearch({
       searching: true,
       keyword: value.input
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
            placeholder = "what are you looking for?"
            variant = "outlined"
            value = {formik.values.input}
            onChange = {formik.handleChange}
          />
        </form>
        {search.searching&&<Redirect to={{
                        pathname: `/search/`,
                        search: `query=${search.keyword}`
                    }}/>}
      </div>
    )}

export default SearchBar;
