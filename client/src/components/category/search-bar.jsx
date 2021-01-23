import React from 'react';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';


export default function SearchBar(){
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
    marginTop: theme.spacing(3),
  },
  searchBar: {
    width: "300px"
  },
}));

const classes = useStyles();

    return(
      <div className ={classes.searchBar}>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <CssBaseline />
        <TextField 
        fullWidth
        id = "input"
        name = "input"
        size = "small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder = "search..."
        variant = "outlined"
        value = {formik.values.input}
        onChange = {formik.handleChange}/>
        
      </form>
      </div>
    )}
