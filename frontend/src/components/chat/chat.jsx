import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import ChatList from './chatlist'

const Chat = () => {
    const [ chats, setChats ] = useState([])
    const [ email, setEmail ] = useState('')
    const [ text, setText ] = useState('')

    useEffect(() => {
        const socket = io('http://localhost:8026')
        socket.on( 'sendMessage', (data) => setChats(data) )
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const socket = io('http://localhost:8026')
        socket.emit('sendNewChat', { email: email, text: text })
        socket.on( 'sendMessage', (data) => setChats(data) )
        setText ('')
    }

    return(
        <div>
            <h2>
                Chat online:
            </h2>
            <div>
                {
                    chats.map( (msg) =>(<ChatList key={msg.id} msg={msg} />) )
                }
            </div>
            <div>
                <h2>Escribe un mensaje:</h2>
                <form
                    onSubmit= { handleSubmit }
                    className= ''
                    style={{display: "flex", flexDirection: "column" }}
                >
                    <div>
                        <label htmlFor="email"></label>
                        <input 
                            className='form-control'
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Escriba su email'
                            value={email}
                            onChange= {(e) => setEmail (e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="text"></label>
                        <input 
                            className='form-control'
                            type="text"
                            id="text"
                            name="text"
                            placeholder='Escriba un mensaje...'
                            value={text}
                            onChange= {(e) => setText (e.target.value)}
                        />
                    </div>
                   
                    <div className='mt-4'>
                        <input className="btn btn-success" type="submit" value="Enviar" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat;