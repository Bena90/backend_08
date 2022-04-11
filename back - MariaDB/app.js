import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import startDB from './src/db.js'
import mariaDBConf from './config/mariaDBConf.js';
import http from 'http';
import { Server } from 'socket.io'
import sqlite3Config from './config/SQLiteConfig.js'

dotenv.config()

const app = express ();
const server = http.createServer(app);
const io = new Server (server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
})

// Creamos tabla productos;
startDB(mariaDBConf);

// Config
app.use (express.json());
app.use (express.urlencoded({extended:true}));
app.use (cors())

// Router Import
import { routerProd } from './router/productos.js'
import { routerCart } from './router/cart.js'

// Router
app.use ('/api/productos', routerProd)
app.use ('/api/carrito', routerCart)
app.all('*', (req, res) => {
    res.status(501).json({ error: -2, descripcion: `Ruta no implementada` })
})

// Chat

const knex3 = sqlite3Config;

// Socket Chat
io.on ('connection', async (socket) => {
    console.log ('💻 Nuevo usuario conectado!');
    socket.on("disconnect", () => {
        console.log("❌ Usuario desconectado");
    });
    socket.on('connect_error', (err) => {
    console.log(`Connect_error due to ${err.message}`);
    });

    // Get chats
    const historial = await knex3
        .from('chats')
        .select ('*')
        .orderBy('id', 'asc')
    socket.emit('sendMessage', historial)

    // Get new chats front
    socket.on("sendNewChat", async (newMessage) => {
        newMessage.created_at = new Date().toLocaleString();
        await knex3('chats').insert(newMessage);
        const newChat = await knex3('chats').select("*").orderBy("id", "asc")
        io.sockets.emit("sendMessages", newChat);
    });
})

// Start Server
const port = process.env.PORT || 8080
server.listen(port, () => {
    console.log(`🖥️ Server run on http://localhost:${port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))