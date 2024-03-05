import axios from 'axios'
import Loading from '../Loading/Loading'
import React, { useEffect, useState, useRef } from 'react'
import { useQuery } from 'react-query'


export default function Brand() {
  let [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState([])
  let { data2, isLoading } = useQuery('getBrands', getBrands)


  async function getBrands() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
    setBrands(data.data)
    console.log(data.data);
    setLoading(false)

  }
  useEffect(() => {
    getBrands()
  }, [])

  // if (loading) return <Loading />
  if (isLoading) return <Loading />

  return (
    <>
      <div className="container pt-5 mt-5">
        <h5 className='fw-bolder m-4 '>Shop in Brands</h5>
        <div className="row gy-3 cursor-pointer">
          {
            brands.map((item) => {
              return <div key={item._id} className='col-md-3'>

                <img src={item.image} className='w-100 img55' height={250} alt="" />
                <h2 className='text-center py-3'>{item.name}</h2>
              </div>

            })}

        </div>

      </div>
    </>
  )
}
