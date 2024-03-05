import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { storeContext } from '../Components/Context/storeContext'
import Slider from 'react-slick'
import { useParams } from 'react-router-dom'

export default function ProductSlider() {
    // let { counter, setCounter, addToCart, addToWishList, setCounter2 } = useContext(storeContext)
    const [images, setImages] = useState([])
    let x = useParams()

    async function getProductDet() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)
        setImages(data?.data?.images)
    }
    useEffect(() => {
        getProductDet()
    }, [])


    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    return (
        <>
            <div className="slider-container container-fluid">
                <Slider {...settings}>
                    {
                        images?.map((item) => (
                            <img key={item._id} src={item} className='w-100' height={450} alt="" />
                        ))
                    }
                </Slider>
            </div>
        </>
    )
}
