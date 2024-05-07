import React from 'react'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/SideBar/Sidebar'
import LocalStore from '../Store/LocalStore'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

export default function Main() {
    const isAuthenticated = () => {
        const tokenData = LocalStore.getToken()
        return tokenData && tokenData.token
    }
    if (!isAuthenticated()) return <Navigate to={'/login'} />
    return (
        <>
            <Header />
            <Sidebar />

            <Outlet />
        </>
    )
}
