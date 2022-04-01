import * as fs from 'fs';
const fsp = fs.promises;

class Container {
    productos;
    maxId;
    filename;

    constructor(nombreArchivo) {
        this.productos = [],
        this.maxId = 0,
        this.filename = `${nombreArchivo}`
    }

    async save (producto){
        await this.getAll();
        this.maxId++;
        producto.id = this.maxId;
        this.productos.push(producto);
        try {
            await fsp.writeFile(this.filename, JSON.stringify(this.productos))
            return this.maxId
        } catch (err) {
            console.log(`Error al agregar ${producto} en Archivo: ${this.filename}: ${err}`,)            
        }
    }

    async update (producto) {
        try {
            await this.getAll ();
            const productoA = await this.getById(producto.id);
            if (productoA != null){
                if(producto.title != ""){
                    productoA.title = producto.title;
                }
                if(producto.price != ''){
                    productoA.price = producto.price;
                }
                if(producto.thumbnail != ''){
                    productoA.thumbnail = producto.thumbnail;
                }
                await fsp.writeFile (this.filename, JSON.stringify(this.productos))
                return true;
            } else{
                return false;
            }
        } catch (err) {
            `No se pudo actualizar ${producto} en Archivo: ${this.filename}: ${err}`
        };
        throw new Error (err);
    }

    async getById(id) {
        try{
            const prod = await this.getAll();
            return prod.find ((obj) => obj.id == id) || null;
        } catch (err){
            `Error al obtener producto con id "${id}" en Archivo: "${this.filename}" ERROR: ${err}`
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

    async getAll (){
        try {
            if (!fs.existsSync(this.filename)){
                await fsp.writeFile (this.filename, JSON.stringify([]))
            }else{
                const products = JSON.parse(
                    await fsp.readFile (this.filename, 'utf-8')
                );
                this.productos = products;
                if ( this.productos. length > 0 ) {
                    // Verificar esto despues. Deuda Técnica.
                    this.productos.map ((producto) =>{
                        if (producto.id && this.maxId < producto.id)
                        this.maxId = producto.id;
                    })
                }
            }
            return this.productos
        } catch (err) {
            console.log (`Error al obtener productos de Archivo: ${this.nombreArchivo} ERROR: ${err}`);                 
        }
    }

    async deleteById (id) {
        try {
            const prod = await this.getAll();
            const newProd = prod.filter ((obj) => obj.id != id)
            if (prod.length === newProd.length){
                return false
            }
            await fsp.writeFile (this.filename, JSON.stringify(newProd))
        } catch (err) {
            console.log (`Error al eliminar producto de ID: "${id}" en Archivo: "${this.filename}" Error: ${err}`)
        }
    }
}

export { Container as Container };
