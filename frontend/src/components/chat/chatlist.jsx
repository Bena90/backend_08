import React from 'react'

const ChatList = ( {msg} ) =>{


    return(
        <div key={msg.id}>
            <h6><strong> {msg.created_at}From: {msg.email} </strong></h6>
            <p> {msg.text} </p>


        </div>
    )
}

export default ChatList;