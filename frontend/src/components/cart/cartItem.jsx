import React from 'react'
import { Button } from 'react-bootstrap'
import { useProduct } from '../../context/context'

export const CartItem = ({producto}) => {

    const { deleteProduct } = useProduct()

    return (
        <tr className='table-success'>
            <td className='table-success'>
                {producto.title}
            </td>
            <td className='fw-bold'>
                $ {producto.price}
            </td>
            <td>
                <Button
                    className='btn btn-danger btn-sm'
                    onClick={()=>deleteProduct(producto.id)}
                >
                    Eliminar
                </Button>
            </td>
            
        </tr>
    )
}