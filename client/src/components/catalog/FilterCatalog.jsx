import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, ButtonGroup, Card, CardHeader, CardContent, makeStyles} from '@material-ui/core';

const FilterCatalog = (props) => {
    const [categories, setCategories] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(false);

    const useStyles = makeStyles((theme) => ({
        cardHeader: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          }
    }))

    const classes = useStyles();

    const displayCategories = () => {
        if(typeof categories === "object"){
            return categories.map((cat, inx) => {
                return (
                    <Button fullWidth key={inx} onClick={() => setCurrentCategory(cat.id)}>
                        {cat.name}
                    </Button>
                )
            })
        }
        else{
            return "Loading"
        }
    }
    //Display categories. 
    useEffect(() => {
        console.log("loading..")
        axios.get('http://localhost:3000/category/all')
        .then(categories => 
            {
                console.log("categories: ", categories)
                setCategories(categories.data)
            }
        )
        .catch(error => console.log(error))             
    }, [])
    //Set Category in Catalog. 
    useEffect(() => {
        if(currentCategory){ 
           //ToDo update catalog state. props.setCurrent(currentCategory)
           props.updateFilter(currentCategory)
        }
    }, [currentCategory])
    return (

    <Card>
        <CardHeader
                  title="Categorias"
                  titleTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
        <CardContent justify="center" alignItems="center">      
            <ButtonGroup fullWidth orientation="vertical"  color="primary">
                {displayCategories()}
            </ButtonGroup>
        </CardContent>  
    </Card>      
    )   
}

export default FilterCatalog;
