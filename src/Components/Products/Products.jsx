import axios from 'axios'
import React, { useEffect } from 'react'
// import { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import Product from '../Product/Product'
import { useQuery } from 'react-query'
import { useState } from 'react'

export default function Products() {
  let [searchedArray, setSearchedArray] = useState([])



  function getProducts() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/products')


  }

  let { data, isLoading } = useQuery('getProducts', getProducts)
  console.log(data?.data.data);


  useEffect(() => {

    setSearchedArray(data?.data?.data)


  }, [data])


  if (isLoading) return <Loading />

  function search(a) {
    let term = a.target.value
    let newArr = data?.data.data.filter((ele) => ele.title.toLowerCase().trim().includes(term.toLowerCase().trim()));
    setSearchedArray(newArr)
    console.log(newArr)
  }
  // 


  return (
    <>
      <div id='search' className='m-auto w-75 mt-5 pt5'
        onChange={search}>
        <label className='mt-5' htmlFor="search">Search Products</label>
        <input type="text" className='form-control mt-3 p-2 shadow border border-1' />

      </div>
      <div className="container my-5">
        <h2 className='text-center pt-3 fw-bolder'>Products</h2>
        <div className="row g-4 mt-5">

          {/* {data?.data.data.map(item => {
            return <Product item={item} key={item._id} />
          })} */}


          {searchedArray?.length ? searchedArray?.map((item) =>
            <Product item={item} key={item._id} ></Product>) : data?.data.data.map((item) => {
              <Product item={item} key={item._id} > </Product>
            })}


        </div>
      </div>
    </>
  )
}
