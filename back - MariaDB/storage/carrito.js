import * as fs from 'fs';
const fsp = fs.promises;
import { v4 as uuidv4 } from 'uuid';

const utf = 'utf-8'

class Carrito {
    id;
    timestamp;
    productos;

    constructor(nombreArchivo){
        this.id = uuidv4();
        this.timestamp = Date.now();
        this.productos = [];
        this.filename = `${nombreArchivo}`
    }
    
    async createCart ( prod ){
        const carrito = await this.getAll()
        const order = {
            id: this.id,
            timestamp: this.timestamp,
            productos: prod
        }
        carrito.push (order)
        try {
            await fsp.writeFile(this.filename, JSON.stringify(carrito))
            return order
        } catch (err) {
            console.log(`Error al agregar orden ${this.id}, error: ${err}`)
        }   
    }

    async getAll () {
        try{
            const carrito = JSON.parse(await fsp.readFile (this.filename, utf))
            return carrito
        } catch (err) {
            (err) => console.log(err)
        }
    }
    
    async deleteOrderById ( id ){
        try {      
            const carrito = await this.getAll();
            const newCarrito = carrito.filter((obj) => obj.id !== id)
            await fsp.writeFile (this.filename, JSON.stringify(newCarrito))
            return (newCarrito)
        } catch (error) {
            console.log(error)            
        }
    }
}

export { Carrito as Carrito };