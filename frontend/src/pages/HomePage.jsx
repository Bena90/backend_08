import React from 'react'
import { Container } from 'react-bootstrap'
import CartList from '../components/cart/cartList'
import Chat from '../components/chat/chat'
import ProductForm from '../components/form/form'
import ItemList from '../components/itemList/itemList'
import OrdersList from '../components/orders/orderList'
import { useProduct } from '../context/context'


const HomePage = () =>{
    const { admin, setAdmin } = useProduct()
    
    return(
        <Container className='my-4'>
            <h1 className='text-center'> Desafío E-Commerce </h1>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" value={admin} onChange={()=>setAdmin(!admin)} id="flexSwitchCheckDefault"/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Admin</label>
            </div>
            <div>
            {(admin) && <ProductForm/>}                 
            </div>
                <hr />
            <div>
            <div className="border border-warning bg-light rounded-3 p-3">
                <ItemList/>
            </div>
            </div>
            <hr />
            <div className='border border-secondary bg-light rounded-3 p-3'>
                <CartList />
            </div>
            <hr />
            <div className="border border-danger bg-light rounded-3 p-3">
                <OrdersList/>
            </div>
            <hr />
            <div className="border border-success bg-light rounded-3 p-3">
                <Chat/>
            </div>
            <hr />
        </Container>
    )
}

export default HomePage;