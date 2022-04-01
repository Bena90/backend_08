import { Router } from "express";
import { Container } from '../storage/container.js'

export const routerProd = Router ();

const container = new Container ('./src/productos.json')

routerProd.get ('/', async (req, res) => {
    const products = await container.getAll();
    res.send(products)
})

routerProd.post ('/', async (req, res) => {
    const product = req.body;
    let id = await container.save (product);
    res.send (await container.getById(id))
})

routerProd.delete ('/:id', async (req, res) => {
    const prodDelete = await container.deleteById (req.params.id)
    if (prodDelete === false){
        res.send ('Producto no encontrado.')
    }
    res.send (`Producto con id ${req.params.id} eliminado correctamente.`)
})

routerProd.put ('/:id', async (req, res) => {
    const prod = req.body;
    prod.id = req.params.id;
    const act = await container.update (prod);
    if (act == true){
        res.send('Producto actualizado correctamente')
    }else{
        res.send('No se ha podido actualizar el producto.')
    }
})

