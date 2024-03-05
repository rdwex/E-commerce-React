import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../../assets/logo.png"

export default function () {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid ms-3">
                    <img src={logo} alt="logo" className='mx-1 fw-bolder' width={45} />
                    <NavLink className="navbar-brand fw-bolder" href="#">FreshCart </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 me-4 mb-lg-0">
                            <li className="nav-item mx-3">
                                <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin">SignIn </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
