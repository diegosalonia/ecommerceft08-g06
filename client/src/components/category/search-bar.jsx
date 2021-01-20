import React ,{ useState }from 'react';
import image from "../../resourses/search-icon.png"
import './search-bar.css'

export default function SearchBar(){
    const [input, setInput] = useState ("")

const onChange = (e) =>{
    e.preventDefault();
    setInput(e.target.value)
}

const onSubmit = (e) =>{
    e.preventDefault()
    setInput("")
}

    return(
        <form className = 'form' onSubmit = {(e) => onSubmit(e)}>
      <div>
        <input 
          type = "text" 
          placeholder = " search..." 
          className = "input"
          value = {input} 
          onChange = {(e) => onChange(e)}>
        </input>
      </div>
      <button className = 'button' type = "submit"><img src = {image} className = "img" alt = ""></img></button>
        </form>

    )
}
