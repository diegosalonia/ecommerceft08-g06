import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CategoryBox from './CategoryBox';


const CategoriesCollection = (props) => {

    const [categories, setCategories] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3000/category/all')
        .then(categories => 
            {
                console.log(categories.data)
                setCategories(categories.data);
            }
        )
        .catch(error => console.log(error))             
    }, [])

    const DisplayCategories = () => {
        if(typeof categories === "object"){
            return categories.map((cat, inx) => {
                return (
                    <CategoryBox category={cat} key={inx} />
                )
            })
        }
        else{
            return "Loading"
        }
    }
    
    return <DisplayCategories />
}

export default CategoriesCollection; 
