import { useParams } from 'react-router-dom'
import Loading from '../Components/Loading/Loading'
import axios from 'axios'
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { storeContext } from '../Components/Context/storeContext'
import { toast } from 'react-toastify'
import ProductSlider from './ProductSlider'

export default function ProductDetails() {
    let [btnloading, setBtnLoading] = useState(true)



    let { counter, setCounter, addToCart, addToWishList, setCounter2 } = useContext(storeContext)
    let [btnloading2, setBtnLoading2] = useState(true)

    let x = useParams()
    let [productDetails, setProductDetails] = useState([])
    let [loading, setLoading] = useState(true)
    const [myColor, setColor] = useState("grey");

    async function getProductDet() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)
        setProductDetails(data.data)
        setLoading(false)
    }
    useEffect(() => {
        getProductDet()
    }, [])

    if (loading) return <Loading />

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

    return (
        <>
            <div className="container mt-5 pt-5">
                <div className="row mt-5 p-1">
                    <div className="col-md-4">
                        {/* <img src={productDetails.imageCover} className='w-100' alt="" /> */}
                        <ProductSlider />
                    </div>
                    <div className="col-md-8 mt-5">
                        <h4>{productDetails.title}</h4>
                        <p className='my-3'>{productDetails.description}</p>
                        <div>
                            <div>
                                <span>{productDetails.category.name}</span>
                                <div className='d-flex justify-content-between mt-5'>
                                    <div>{productDetails.price} EGP</div>
                                    <div>
                                        <i className='fa-solid fa-star rating-color '></i>
                                        {productDetails.ratingsAverage}</div>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <button disabled={!btnloading} onClick={() => ((addProductToCart(productDetails._id)))} className='text-center w-100 text-white btn bg-main mt-3'>
                                    {btnloading ? 'Add To Cart' : 'loading...'}
                                </button>
                                <button disabled={!btnloading2} onClick={() => ((addProductToWishList(productDetails._id)))}
                                    className='btn'><i onClick={() => setColor('darkred')} style={{ color: myColor }} className="fa-solid fa-heart fs-2"></i>
                                    {btnloading2 ? '' : ''}

                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
