import { v4 as uuidv4 } from 'uuid';

class Container {
    productos;
    maxId;
    filename;

    constructor(nombreArchivo) {
        this.productos = [],
        this.maxId = 0,
        this.filename = `${nombreArchivo}`
    }

    async save (producto, knex){
        producto.id = uuidv4();
        try {
            await knex('productos').insert(producto)
            console.log('Agregado')
            return `${producto.title} agregado con id ${producto.id}.`
        } catch (err) {
            console.log(`Error al agregar ${producto.title}: ${err}`,)
        }
    }

    async update (producto, knex) {
        try {
            const productoA = await this.getById(producto.id, knex);
            if (productoA != null){
                if(producto.title != ''){
                    productoA.title = producto.title;
                }
                if(producto.price != ''){
                    productoA.price = producto.price;
                }
                if(producto.thumbnail != ''){
                    productoA.thumbnail = producto.thumbnail;
                }
                await knex('productos')
                    .where({id: producto.id})
                    .update(productoA)
                return true;
            } else{
                return false;
            }
        } catch (err) {
            `No se pudo actualizar ${producto} en Archivo: ${this.filename}: ${err}`
        };
        throw new Error (err);
    }

    async getById(id, knex) {
        try{
            const prod = await this.getAll(knex);
            return prod.find ((obj) => obj.id == id) || null;
        } catch (err){
            `Error al obtener producto con id ${id} ERROR: ${err}`
        }
    }

    async getRandom(){
        try{
            const prod = await this.getAll ();
            const id = Math.floor (Math.random() * (this.maxId -1)) + 1;
            return prod.find ((obj) => obj.id == id) || null;
        } catch (err){
            console.log(
                `Error en búsqueda aleatoria: "${this.filename}" ERROR: ${err}`,
              );
        }
    }

    async getAll (knex){
        try {
            const productsList = await knex.select().from('productos')
            return productsList;
        } catch (err) {
            console.log (`Error al obtener productos de Archivo: ${this.nombreArchivo} ERROR: ${err}`);                 
        }
    }

    async deleteById (itemId, knex) {
        try {
            await knex('productos')
                .where({id: itemId})
                .del()
                .then (()=>{
                    console.log(`Borrado correctamente producto con id ${itemId}`)
                })
                .catch ((err)=> console.log (err))
        } catch (err) {
            console.log (`Error al eliminar producto de ID: "${id}" en Archivo: "${this.filename}" Error: ${err}`)
        }
    }
}

export { Container as Container };
