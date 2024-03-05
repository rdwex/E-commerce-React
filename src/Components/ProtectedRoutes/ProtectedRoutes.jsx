import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoutes({ children }) {

    let token = localStorage.getItem('token')

    try {
        const decoded = jwtDecode(token);
        console.log(decoded);

    } catch (error) {
        console.log('errors');
        localStorage.clear()
        return <Navigate to='/signin' />

    }

    if (token) return children

    // // return x('/signin')      // return function lazem yab2 html 

    return <Navigate to='/signin' />
}
