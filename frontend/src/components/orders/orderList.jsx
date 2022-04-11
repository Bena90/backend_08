import React from 'react'
import { Container } from 'react-bootstrap';
import { useProduct } from '../../context/context';
import Orders from './orders';

const OrdersList = () =>{

    const { orders } = useProduct();
    return(
        <Container>
            <h3>Ordenes realizadas</h3>
            {
                orders.map( (ord)=> <Orders key={ord.id} or={ord} />)
            }
        </Container>
    )
}

export default OrdersList;