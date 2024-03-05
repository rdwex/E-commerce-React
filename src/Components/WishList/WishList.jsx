import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { storeContext } from '../Context/storeContext'
import Loading from '../Loading/Loading'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'


export default function WishList() {
    let { getWishlist, deleteWish, addToCart, setCounter, setCounter2 } = useContext(storeContext)

    const [data, setData] = useState(null)

    let { data2, isLoading } = useQuery('getWishlist', getWishlist)



    useEffect(() => {
        (async () => {
            let data = await getWishlist()
            if (data?.response?.statusMsg == 'fail') {
                setData(null)
            }
            else {
                setData(data)
            }
            console.log(data);

        })()
    })


    async function deleteWishlist(productId) {
        let data = await deleteWish(productId)
        console.log(data);
        if (data.status == 'success') {
            toast.error('Product deleted successfully')
            setCounter2(data.count)
            setData(data)
            console.log(data);
        }
    }
    async function addProductToCart(productId) {
        let data = await addToCart(productId)
        console.log(data);
        if (data.status == 'success') {
            toast.success(' Product added successfully.')
            setCounter(data.numOfCartItems)
            deleteWishlist(productId)
            // setData(data)
        }
    }


    if (isLoading) return <Loading />

    if (data == null || data.count == 0) return <h2 className='text-center text-main my-5'>No Items Found in WishList</h2>


    return (
        <>
            <div className="container mt-5 pt-3">
                <div className="container my-5 pt-5 bg-light p-5">
                    <h2 className='fw-bold my-2'>WishList ♡</h2>
                    {data?.data?.map(item => {
                        return <div item={item} key={item._id} className="bg-grey">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src={item.imageCover} className='w-100 py-3' alt="" />
                                </div>
                                <div className="col-md-10 mt-5 py-3 d-flex justify-content-between">
                                    <div>
                                        <h5 className='fw-bolder'>{item.title}</h5>
                                        <h6 className='text-main fw-bolder mt-1'>price: {item.price} EGP</h6>
                                        <button onClick={() => { deleteWishlist(item._id) }} className='btn text-danger'><i className="fa-solid fa-trash"></i>  Remove</button>

                                    </div>
                                    <div>
                                        <button onClick={() => ((addProductToCart(item._id)))} className='text-center w-100 text-white btn bg-main mt-3'>
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    })}
                </div>
            </div>
        </>
    )
}



