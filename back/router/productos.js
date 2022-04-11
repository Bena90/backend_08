import { Router } from "express";
import { Container } from '../storage/container.js'
import mariaDBConf from "../config/mariaDBConf.js";
import knex from 'knex';
import dotenv from 'dotenv'

dotenv.config()

const knexDB = knex(mariaDBConf);

export const routerProd = Router ();

const container = new Container ('./src/productos.json')

const admin = process.env.ADMIN

routerProd.get ('/', async (req, res) => {
    const products = await container.getAll(knexDB);
    res.status(200).send(products)
})

routerProd.post ('/', async (req, res) => {
    if (!admin) {
        return res.status(401).json({
            error: 401, descripción: 'NO Autorizado'
        });
    }
    const product = req.body;
    let id = await container.save (product, knexDB);
    res.status(200).send (id)
})

routerProd.delete ('/:id', async (req, res) => {
    if (!admin) {
        return res.status(401).json({
            error: 401, descripción: 'NO Autorizado'
        });
    }
    const prodDelete = await container.deleteById (req.params.id, knexDB)
    if (prodDelete === false){
        res.status(400).send ('Producto no encontrado.')
    }
    res.status(200).send (`Producto con id ${req.params.id} eliminado correctamente.`)
})

routerProd.put ('/:id', async (req, res) => {
    const prod = req.body;
    prod.id = req.params.id;
    const act = await container.update (prod, knexDB);
    if (act == true){
        res.status(200).send('Producto actualizado correctamente.')
    }else{
        res.status(400).send('No se ha podido actualizar el producto.')
    }
})

