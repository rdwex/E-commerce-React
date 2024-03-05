import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarSign from '../NavbarSign/NavbarSign'

export default function AuthLayout() {
    return (
        <>
            <NavbarSign />
            <Outlet />
        </>
    )
}
