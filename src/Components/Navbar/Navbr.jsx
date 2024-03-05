

import React, { useContext } from 'react'
import logo from "../../assets/logo.png"
import { NavLink } from 'react-router-dom'
import { storeContext } from '../Context/storeContext'
import { useEffect } from 'react'

export default function Navbr() {
    let { counter, getCart, setCounter, getWishlist, counter2, setCounter2 } = useContext(storeContext)
    useEffect(() => {
        (async () => {
            let data = await getCart()
            // let data2 = await getWishlist()
            console.log(data);
            setCounter(data.numOfCartItems)
            // setCounter2(data2.count)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            let data = await getWishlist()
            console.log(data);
            setCounter2(data?.count)
        })()
    })


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm">
                <div className="container-fluid ms-3">
                    <img src={logo} alt="logo" className='mx-1 fw-bolder' width={45} />
                    <NavLink className="navbar-brand fw-bolder" href="#">FreshCart </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/home">Home </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/cart">Cart </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Products </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/categories">Categories </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Brand">Brands </NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 me-4 mb-lg-0">
                            <li className="nav-item mx-3">
                                <NavLink className="nav-link position-relative" to="/cart">
                                    Cart
                                    {counter ? <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger">
                                        {counter}
                                    </span> : ''}
                                    <i className="fa-solid fa-cart-shopping mx-2" />

                                </NavLink>
                            </li>
                            <li className="nav-item mx-3">
                                <NavLink className="nav-link" to="/wishList">WishLists

                                    <i className="mx-2 fa-solid fa-heart" />
                                    {counter2 ? <span className="position-absolute ms-1 translate-middle badge rounded-pill bg-danger">
                                        {counter2}
                                    </span> : ''}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin">SignOut </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
