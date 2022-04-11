import React from 'react'
import { Row } from 'react-bootstrap';
import { useProduct } from '../../context/context';
import Item from '../item/item';

const ItemList = () => {

    const { productos } = useProduct();

    return (
        <div>
            <h2> Listado de productos: </h2>
            
            <Row>
                {
                    productos.map( (prod) =>(<Item key={prod.id} producto={prod} />) )
                }
            </Row>
        </div>
    )
}

export default ItemList;