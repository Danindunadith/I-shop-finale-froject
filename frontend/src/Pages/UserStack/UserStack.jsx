import React from 'react'
import Products from './Home/Products'
import Notification from './Notification/Notification'
import Checkout from './Checkout/Checkout'
import LocalStore from '../../Store/LocalStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function UserStack() {
  // Determine if the user has admin privileges
  const isUser = () => {
    const tokenData = LocalStore.getToken();
    return tokenData && tokenData.role === 'user';
  };
  if (!isUser())
    return <Navigate to={'/notallowed'} />
  return (
    <>
      <Outlet/>
    </>
  )
}
