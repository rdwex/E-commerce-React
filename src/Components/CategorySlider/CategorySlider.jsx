import axios from 'axios'
import Slider from 'react-slick'

import React, { useEffect, useState, useRef } from 'react'

export default function CategorySlider() {

    const [categories, setCategories] = useState([])
    async function getCategories() {
        let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
        setCategories(data.data)
        console.log(data.data);
    }

    useEffect(() => {
        getCategories()
    }, [])
    let sliderRef = useRef(null);
    const play = () => {
        sliderRef.slickPlay();
    };
    const pause = () => {
        sliderRef.slickPause();
    };

    let settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000

    };

    return (
        <>
            <div className="slider-container container-fluid">
                <h5 className='fw-bolder m-4  '>Shop in Categories</h5>

                <Slider ref={slider => (sliderRef = slider)} {...settings}>
                    {
                        categories.map((item) => (
                            <img key={item._id} src={item.image} className='w-100' height={200} alt="" />
                        ))

                    }
                </Slider>
            </div>
        </>
    )
}
