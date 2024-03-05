import axios from 'axios'
import Slider from "react-slick";
import Loading from '../Loading/Loading'
import React, { useEffect, useState, useRef } from 'react'
import { useQuery } from 'react-query';


export default function Categories() {

    let [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    async function getCategories() {
        let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
        setCategories(data.data)
        console.log(data.data);
        setLoading(false)

    }
    useEffect(() => {
        getCategories()
    }, [])


    let { data, isLoading } = useQuery('getCategories', getCategories)
    if (isLoading) return <Loading />

    return (
        <>
            <div className="container mt-5 pt-5">
                <h5 className='fw-bolder m-4 mt-5'>Shop in Categories</h5>
                <div className="row gy-3 cursor-pointer">
                    {
                        categories.map((item) => {
                            return <div key={item._id} className='m-5 w-25'> <img src={item.image} className='w-100 img55' height={330} alt="" />
                                <h2 className='text-center py-3'>{item.name}</h2>
                            </div>

                        })}

                </div>

            </div>
        </>
    )
}
