import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useProduct } from '../context/context'
import { Container, Button } from 'react-bootstrap'


const UpdatePage = () => {

    // Estados

    const { iD } = useParams ()
    console.log (iD)
    const [ title, setTitle  ] = useState ("")
    const [ price, setPrice ] = useState ("")
    const [ thumbnail, setThumbnail ] = useState ("")

    const {getProducts, setAdmin, setProductos, urlProd } = useProduct ();
    const navigate = useNavigate()

    const returnHome = () => {
        setAdmin(false)
        navigate('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log ({title})
        axios.put (urlProd+iD, { title:title, price: parseInt(price), thumbnail: thumbnail })
            .then((res) => console.log(res))
            .catch ((err) => console.log(err))
            .finally (()=> {
                getProducts(urlProd, setProductos);
                setAdmin(false)
                navigate ('/');
            })
    }
    
    return (
        <Container className='my-4'>
            <h1>Actualización de producto: </h1>
            <Button
                onClick={()=>returnHome()}
                className='my-3'> Volver
            </Button>
            <hr />
            <form
                onSubmit= { handleSubmit }
                className= ''
                style={{display: "flex", flexDirection: "column" }}
            >
                <div>
                    <label htmlFor="title"></label>
                    <input 
                        className='form-control'
                        type="text"
                        id="title"
                        name="title"
                        placeholder='Nombre del producto'
                        value={title}
                        onChange= {(e) => setTitle (e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price"></label>
                    <input 
                        className='form-control'
                        type="number"
                        id="price"
                        name="price"
                        placeholder='Precio del producto'
                        value={price}
                        onChange= {(e) => setPrice (e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="thumbnail"></label>
                    <input 
                        className='form-control'
                        type="text"
                        id="thumbnail"
                        name="thumbnail"
                        placeholder='URL de imagen'
                        value={thumbnail}
                        onChange= {(e) => setThumbnail (e.target.value)}
                    />
                </div>
                <div className='mt-4'>
                    <input className="btn btn-success" type="submit" value="Enviar" />
                </div>
            </form>
            <hr />
            <Button
                onClick={()=>returnHome()}
                className='my-3'> Volver
            </Button>
        </Container>
    )
}

export default UpdatePage;