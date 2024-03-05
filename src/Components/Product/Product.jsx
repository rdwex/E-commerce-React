import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { storeContext } from '../Context/storeContext'
import { toast } from 'react-toastify'
import { useState } from 'react'

export default function Product({ item }) {

    let { counter, counter2, setCounter, addToCart, addToWishList, setCounter2 } = useContext(storeContext)
    let [btnloading, setBtnLoading] = useState(true)
    let [btnloading2, setBtnLoading2] = useState(true)

    const [myColor, setColor] = useState("grey");

 



    async function addProductToCart(productId) {
        setBtnLoading(false)
        let data = await addToCart(productId)
        console.log(data);


        if (data.status == 'success') {
            toast.success(' Product added successfully.')
            setCounter(data.numOfCartItems)
            setBtnLoading(true)

        }
    }

    async function addProductToWishList(productId) {
        setBtnLoading2(false)
        let data = await addToWishList(productId)
        console.log(data);

        if (data.status == 'success') {
            toast.success(' Product added successfully to WishList.')
            setCounter2(data.count)
            setBtnLoading2(true)

        }
    }
    // useEffect(() => {


    //     setColor()
    // }, [])

    return (
        <>



            <div className="col-md-2">

                <div className="product cursor-pointer rounded-3 p-3">
                    <Link to={'/product-details/' + item._id}>
                        <img src={item.imageCover} className='w-100 pb-2' alt="" />
                        <span className='text-main'>{item.category.name}</span>
                        <h6 className=' fw-bolder my-2'>{item.title.split(' ').slice(0, 2).join(' ')}</h6>
                        <div className='d-flex justify-content-between'>
                            <div>{item.price} EGP</div>
                            <div>
                                <i className='fa-solid fa-star rating-color '></i>
                                {item.ratingsAverage}</div>
                        </div>
                    </Link>
                    <div className='d-flex'>
                        <button disabled={!btnloading} onClick={() => ((addProductToCart(item._id)))} className='text-center w-100 text-white btn bg-main mt-3'>
                            {btnloading ? 'Add To Cart' : 'loading...'}
                        </button>
                        <button disabled={!btnloading2} onClick={() => ((addProductToWishList(item._id)))}
                            className='btn'><i onClick={() => setColor('darkred')} style={{ color: myColor }} className="fa-solid fa-heart fs-2"></i>
                            {btnloading2 ? '' : ''}

                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
