import knex from "knex";

const sqlite3Config = knex({
    client: 'sqlite3',
    connection: {
      filename: './config/DB.sqlite3.db3',
    }
  ,  
  pool: {min:2 , max:7}
});

//Primeros chats

//sqlite3Config('chats').insert([
//  {
//  email: "esteban@gmail.com",
//  text: "Cómo estás?"
//}
//])
//.then(() => {
//  console.log("Chats cargados");
//})
//.catch((err) => {
//  throw err;
//});

 export default sqlite3Config;