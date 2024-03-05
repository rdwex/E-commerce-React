import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { storeContext } from '../Context/storeContext'
import Loading from '../Loading/Loading'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'


export default function Carts() {

  let { getCart, deleteItem, setCounter, UpdateCart, clearItem } = useContext(storeContext)
  const [data, setdata] = useState(null)
  // let [loading, setLoading] = useState(true)
  let { data2, isLoading } = useQuery('getCart', getCart)

  useEffect(() => {
    (async () => {
      let data = await getCart()
      if (data?.response?.data?.statusMsg == 'fail') {
        setdata(null)
      }
      else {
        setdata(data)
      }
      console.log(data);
      // setLoading(false)
    })()
  }, [])



  async function deleteProduct(id) {
    let data = await deleteItem(id)
    console.log(data);
    if (data.status == 'success') {
      toast.error('Product deleted successfully')
      setCounter(data.numOfCartItems)
      setdata(data)
    }
  }

  async function clearProduct() {
    let data = await clearItem()
    if (data?.message == 'success') {
      toast.error('Product deleted successfully')
      setCounter(0)
      setdata(null)
    }
    console.log(data);

  }

  async function UpdateProduct(id, count) {
    let data = await UpdateCart(id, count)
    console.log(data);
    if (data.status == 'success') {
      toast.success('Product updated successfully')
      setCounter(data.numOfCartItems)
      setdata(data)
    }
  }


  if (isLoading) return <Loading />

  if (data == null || data.numOfCartItems == 0) return <h2 className='mt-5 text-center text-main pt-5'>No Items Found in Cart</h2>

  return (
    <>
      <div className='mt-5 pt-5 container'>
        <div className="container my-5 pt-5 bg-light p-5">
          <h2 className='fw-bold'>Shop Cart</h2>
          <h5 className='my-3 fw-bold'>Total cart price: <span className='text-main'>{data?.data.totalCartPrice} EGP</span></h5>
          <button onClick={() => { clearProduct() }} className='mb-3 btn text-center btn-success'>Clear List</button>

          {data?.data?.products?.map(item => {
            return <div key={item._id} className="bg-grey">
              <div className="row">
                <div className="col-md-2">
                  <img src={item.product.imageCover} className='w-100 py-3' alt="" />
                </div>
                <div className="col-md-10 mt-5 py-3 d-flex justify-content-between">
                  <div>
                    <h5 className='fw-bolder'>{item.product.title}</h5>
                    <p className='fw-bolder mt-1'>price: {item.price} EGP</p>
                    <button onClick={() => { deleteProduct(item.product._id) }} className='btn text-danger'><i className="fa-solid fa-trash"></i>  Remove</button>
                  </div>
                  <div>
                    <button onClick={() => { UpdateProduct(item.product._id, item.count + 1) }} className='btn btn-outline-success mx-3'>+</button>
                    <span>{item.count}</span>
                    <button onClick={() => { if (item.count <= 1) { deleteProduct(item.product._id) } else { UpdateProduct(item.product._id, item.count - 1) } }} className='btn btn-outline-success mx-3'>-</button>
                  </div>
                </div>
              </div>
            </div>
          })}
          <Link to={`/address/${data.data._id}`}className='bg-main btn p-2 text-white my-5'>
            Place Order

          </Link>
        </div>

      </div>
    </>
  )
}
