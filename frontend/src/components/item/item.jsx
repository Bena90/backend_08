import axios from 'axios';
import React from 'react'
import { Card, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../../context/context';

const Item = ( {producto} ) =>{
    const navigate = useNavigate();
    const { getProducts, admin, addToCart, setProductos, urlProd } = useProduct ();

    const deleteById = ( id ) => {
        axios.delete (urlProd+id)
            .then((res) => console.log(res))
            .catch ((err) => console.log(err))
            .finally (()=> {
                getProducts(urlProd, setProductos)
            })
    }
    return (
            <Col className='my-3 col-2'>
                <Card>
                    <Card.Img variant="top" src={producto.thumbnail} />
                    <Card.Body className='text-center'>
                        <Card.Title>{producto.title}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem className='text-center fw-bold'>$ {producto.price}</ListGroupItem>
                    </ListGroup>
                    <Card.Body className='text-center'>
                            {(admin) && 
                                <div className='d-inline-flex flex-column'>
                                    <Button className='my-2 btn-danger btn-sm' onClick={()=> deleteById(producto.id)}>
                                        Delete
                                    </Button>
                                    <Button className='btn-success btn-sm' onClick={()=> navigate(`/update/${producto.id}`)}>
                                        Update
                                    </Button>
                                </div>
                            }
                            <div>
                                <Button className='btn btn-primary btn-sm my-2' onClick={()=> addToCart(producto)}> Agregar </Button>
                            </div>
                    </Card.Body>
                </Card>
            </Col>
    )
}

export default Item;