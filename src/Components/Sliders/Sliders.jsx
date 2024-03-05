import React, { useRef } from 'react'
import Slider from "react-slick";
// import img1 from "../../assets/slider-image-2.jpeg"
// import img2 from "../../assets/slider-image-1.jpeg"
// import img3 from "../../assets/slider-image-3.jpeg"


export default function Sliders() {
    let sliderRef = useRef(null);
    const play = () => {
        sliderRef.slickPlay();
    };
    const pause = () => {
        sliderRef.slickPause();
    };

    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000

    };

    return (
        <>
            <div className="slider-container mt-5 pt-2">
                <Slider ref={slider => (sliderRef = slider)} {...settings}>
                    <img src='https://f.nooncdn.com/mpcms/EN0003/assets/2ae8db13-5700-463b-943f-7a0d0e26cb69.png?format=avif' />
                    <img src='https://f.nooncdn.com/mpcms/EN0003/assets/54c32f86-795b-48f3-be68-611a1ee531c7.png?format=avif' />
                    <img src='https://f.nooncdn.com/mpcms/EN0003/assets/81bbb7ba-51a0-42d2-b34a-d6332a79a9e4.png?format=avif' />

                </Slider>
            </div>
        </>
    )
}
