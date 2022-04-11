import knex from 'knex';


//Tabla Productos
const startDB = (mariaDBConf) =>{
    const mariaDB = knex(mariaDBConf);
    console.log("Conexión a la DB con éxito!");

    mariaDB.schema.createTableIfNotExists('productos', table =>{
        table.string('title');
        table.float('price');
        table.string('thumbnail');
        table.string('id');
        })
        .then(()=> {
            console.log('Productos conectados!')
        })
        .catch((err) => { console.log(err); throw err })
        .finally(() => { mariaDB.destroy() })

// Primeros productos, descomentar en primer inicio.
//    mariaDB('productos').insert(
//        [
//            {
//                title:"Avion",
//                price:1400,
//                thumbnail:"https://cdn0.iconfinder.com/data/icons/network-connectivity-1/24/airplane_mode_flight_activate_on_switch_setting-128.png",
//                id:4
//            },
//            {
//                title:"Planeta",
//                price:5000,
//                thumbnail:"https://cdn1.iconfinder.com/data/icons/space-travel-flat/340/space_astronomy_system_planet_universe_galaxy_star_mars-256.png",
//                id:7
//            },
//            {   
//                title:"Marcianito",
//                price:100,
//                thumbnail:"https://cdn1.iconfinder.com/data/icons/space-travel-flat/340/space_astronomy_universe_galaxy_alien_fiction_ufo_monster-256.png",
//                id:8
//            },
//            {   
//                title:"Pulpo",
//                price:600,
//                thumbnail:"https://cdn1.iconfinder.com/data/icons/space-travel-flat/340/space_astronomy_universe_galaxy_alien_fiction_monster-256.png",
//                id:9
//            },
//            {   
//                title:"Policia",
//                price:100,
//                thumbnail:"https://cdn1.iconfinder.com/data/icons/city-flat-2/512/people_person_man_police_run-256.png",
//                id:10
//            }
//        ])
//        .then(()=>{
//            console.log('Cargado')
//        })
//        .catch((err)=>{
//            throw (err)
//        })
}
export default startDB;