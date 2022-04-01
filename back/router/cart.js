import { Router } from "express";
import { Carrito } from '../storage/carrito.js'

export const routerCart = Router ();

const cart = new Carrito ('./src/carrito.json')

routerCart.post ('/', async (req, res) => {
    const products = req.body
    let carrito = await cart.createCart(products)
    res.send(`Pedido cargado: ${carrito}`)
})

routerCart.get ('/', async (req, res) => {
    let carrito = await cart.getAll()
    res.send (carrito)
})

routerCart.delete ('/:id', async (req, res) =>{
    const orderDelete = await cart.deleteOrderById(req.params.id)
    res.send (orderDelete)    
})