import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

const app = express ();
dotenv.config()

// Config
app.use (json());
app.use (urlencoded({extended:true}));
app.use (cors())

import { routerProd } from './router/productos.js'
import { routerCart } from './router/cart.js'

// Router
app.use ('/api/productos', routerProd)
app.use ('/api/carrito', routerCart)


// Start Server
const port = process.env.PORT
const server = app.listen(port, () => {
    console.log(`🖥️ Server run on http://localhost:${port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))