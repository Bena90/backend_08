import React from 'react'
import { Container, Button} from 'react-bootstrap';
import { useProduct } from '../../context/context';
import { CartItem } from './cartItem';


const CartList = () => {
    const { cart, createOrder } = useProduct()

    return (
        <Container >
            {(cart.length > 0) && <h3 className="text-center">Carrito:</h3>}    
            <div className="text-center" >
                <table className='d-flex justify-content-center table table-success'>
                    <tbody>
                        {cart.map((prod)=> (<CartItem key={prod.id} producto={prod} /> ))}
                    </tbody>
                </table>
            </div>
            <div className='d-flex justify-content-center'>
                {(cart.length > 0) && <Button onClick={()=>createOrder(cart)}>Crear Orden</Button>}            
            </div>
        </Container>

    )
}

export default CartList;