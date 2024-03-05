import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { storeContext } from '../Context/storeContext'
import Loading from '../Loading/Loading'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

export default function AddOrders() {
    const [orders, setOrders] = useState([])


    async function getUserOrders(id) {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/" + id)
        console.log(data);
        setOrders(data);
    }

    useEffect(() => {
        const { id } = jwtDecode(localStorage.getItem('token'));
        console.log(id);
        getUserOrders(id)
    }, [])


    return (
        <>
            <h1 className='mt-5 ms-5 fw-bolder pt-5'>Your Orders</h1>
            {orders?.map((order) => {
                return <div key={order.id} className='ms-5 order row w-75 p-5 '>

                    <div className='my-2 shadow rounded p-3 '>
                        <div className='d-flex align-items-center'></div>
                        <h2 className='fw-bolder h1'>#{order.id}</h2>
                        <h4 className='text-primary mx-4 fw-bolder'>processing...</h4>
                        <p>You Have Ordered:  {order.cartItems.length} items.</p>
                        <div className='d-flex'>
                            {order.cartItems?.map((item) => {
                                return <div key={item._id} className='d-flex mx-2'>
                                    <img src={item.product.imageCover} width={150} className='img-thumbnail mx-2' alt="" />
                                </div>
                            })}
                        </div>
                        <hr />
                        <p><strong>Total Amount:</strong> {order.totalOrderPrice}  EGP. </p>
                    </div>

                </div>
            })}
        </>
    )
}
