import React from 'react'
import Navbr from '../Navbar/Navbr'
import { Outlet } from 'react-router-dom'

export default function Mainlayout() {
    return (
        <>
            <Navbr />
            <Outlet/>
        </>
    )
}
