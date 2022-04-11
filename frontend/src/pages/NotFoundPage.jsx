import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()
    return(
        <div>
            <h2>
                ERROR 404 - Not Found
            </h2>
            <Button onClick={()=> navigate('/')}> Volver </Button>
        </div>
    )
}

export default NotFoundPage;