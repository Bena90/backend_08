import React, { useState } from 'react'
import axios from 'axios'
import { useProduct } from '../../context/context'

const ProductForm = () => {

    // Estados

    const [ title, setTitle  ] = useState ("")
    const [ price, setPrice ] = useState ("")
    const [ thumbnail, setThumbnail ] = useState ("")

    const {getProducts, setProductos, urlProd} = useProduct ();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post (urlProd, { title:title, price: parseInt(price), thumbnail: thumbnail })
            .then((res) => console.log(res))
            .catch ((err) => console.log(err))
            .finally (()=> {
                getProducts(urlProd, setProductos);
            })
    }
    
    return (
        <div>
            <h2>Carga de productos:</h2>
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
        </div>
    )
}

export default ProductForm;