import React from 'react'

function Email() {
    const order = [
        {
            name: 'Producto1',
            price: 234,
            discount: 0,
            quantity: 2
        },
        {
            name: 'Producto2',
            price: 345,
            discount: 0,
            quantity: 3
        },
        {
            name: 'Producto3',
            price: 456,
            discount: 0,
            quantity: 5
        },
        {
            name: 'Producto4',
            price: 567,
            discount: 0,
            quantity: 1
        },
        {
            name: 'Producto5',
            price: 678,
            discount: 10,
            quantity: 4
        }
    ]

    return (
        <div>
            <h1>Order</h1>
            <table>
                <tr>
                    <th>Producto</th>
                    <th> | </th>
                    <th>Cantidad</th>
                    <th> | </th>
                    <th>Precio</th>
                </tr>
                ${ order.map(({ name, price, discount, quantity }) => {
                    return (
                        <tr>
                            <td>${name}</td>
                            <td> | </td>
                            <td>${quantity}</td>
                            <td> | </td>
                            <td>${price - (price * (discount / 100))}</td>
                        </tr>
                    )
                })}
                <hr />
                <tr>
                    <td>Total:</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>${order.reduce((acc, {price, discount, quantity}) => acc + ((price - (price * (discount / 100))) * quantity), 0)}</td>
                </tr>
            </table>
            <a href={`${`http://localhost:3001/user/orders/${order.id}`}`} >Ingrese aquí para ver los detalles de su compra</a>
            <h3>¡Gracias por su compra!</h3>
        </div>
    )
}

export default Email;
