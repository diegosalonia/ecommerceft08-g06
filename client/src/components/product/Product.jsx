import React from 'react'

function Product({ description, discount, featured, 
                   image, name, price, rating, stock, 
                   categories, quantityInCart }) {
    return (
        <div>
            <img src={ image } alt={ name }></img>
            <h2>{ name }</h2>
            { categories?.map(category => <span>{category}</span>) }
            { discount !== 0 ? 
                             <span> <span className={"lineThrough"}>${ price }</span>
                                ${ price - (discount * price) }
                             </span> 
                             : <span>{ price }</span>
            }
            <span>{ rating }</span>
            <span>{ description }</span>
            <span>
                <button>-</button>
                <span>{ quantityInCart }</span>
                <button>+</button>
            </span>
            <span>{ stock }</span>
            <button>ADD TO CART</button>
        </div>
    );
};

export default Product

/* TODO:
    - Rating Stars
    - Default image
*/