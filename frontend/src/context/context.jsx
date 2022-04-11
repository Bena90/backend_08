import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

export const ProductContext = createContext({});
export const useProduct = () => useContext(ProductContext);

const ContextProvider = ({children}) =>{

    // Estados
    const [ isLoading, setLoading ] = useState (false)
    const [ productos, setProductos ] = useState ([])
    const [ error, setError ] = useState ('')
    const [ admin, setAdmin ] = useState(false)
    const [ cart, setCart ] = useState ([])
    const [ orders, setOrders ] = useState ([])

    const urlCart = 'http://localhost:8026/api/carrito/'
    const urlProd = 'http://localhost:8026/api/productos/'

    // Productos
    const getProducts = (url, set) => {
        setLoading (true);
        
        axios.get(url)
            .then((res) => {
                set(res.data)
            })
            .catch((err) =>{
                setError (err)
            })
            .finally(() =>{
                setLoading(false)
            })
    }

    const addToCart = (producto) =>{
        const newProduct = producto;
        let findId = cart.findIndex(element => element.id === newProduct.id)
        if (findId < 0){
            setCart((prevState) => [...prevState, newProduct])
          }
    }

    const deleteProduct = (id) => {
        const newCart = cart.filter ((obj)=> obj.id !== id)
        setCart (newCart)
    }

    //Ordenes
    const createOrder = (carrito) => {
        axios.post (urlCart, carrito)
            .then((res)=>console.log(res))
            .catch ((err)=> console.log(err))
            .finally(()=>{
                setCart([])
                getProducts(urlCart, setOrders)
            })
    }

    const deleteById = ( id ) => {
        axios.delete (urlCart+id)
            .then((res) => console.log(res))
            .catch ((err) => console.log(err))
            .finally (()=> {
                getProducts(urlCart, setOrders)
            })
    }
        
    useEffect (() => {
        let URI = urlProd
        setLoading (true);
        
        axios.get(URI)
            .then((res) => {
                setProductos(res.data)
            })
            .catch((err) =>{
                setError (err)
            })
            .finally(() =>{
                setLoading(false)
            })

        axios.get (urlCart)
            .then((res) => setOrders(res.data))
            .catch((err) => console.log(err))
            
    }, [productos.length]);

    if (isLoading){
        return (
            <div>
                <Spinner animation="border" variant="danger" />
            </div>
        )
    }else if (error){
        return <p>Ha habido un error: {error}</p>
    }else{
    return(
        <ProductContext.Provider
            value={{
                productos,
                isLoading,
                getProducts,
                admin,
                setAdmin,
                addToCart,
                setProductos,
                cart,
                deleteProduct,
                createOrder,
                orders,
                urlCart,
                urlProd,
                deleteById
            }}
        >
            {children}
        </ProductContext.Provider>
    )
    }
}

export default ContextProvider;