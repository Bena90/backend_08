import React from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios'
import { useProduct } from '../../context/context';


const Orders = ({or}) => {
    const { deleteById } = useProduct()

    return(
        <div className='border shadow-sm m-4'>
            <h5><strong>ID orden: </strong>{or.id}</h5>
            <h6><strong>Timestamp: </strong>{or.timestamp}</h6>
            <p>Productos:</p>
                {
                    or.productos.map((prod) => 
                        <ul>
                            <li> {prod.title} - <strong>${prod.price}</strong> </li>
                        </ul>
                    )
                }
            <Button
                className='btn btn-danger btn-sm m-2'
                onClick={()=> deleteById (or.id)}    
            > Delete </Button>
        </div>

    )
}

export default Orders;
