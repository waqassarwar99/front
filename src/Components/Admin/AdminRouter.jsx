import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import Home from './Pages/Home/Home';
import ViewComplaint from './Pages/Complaints/ViewComplaint/VIewComplaint';
import Profile from './Pages/Profile/Profile';
import ChangePassword from '../../Components/Admin/Pages/Profile/ChangePassword/ChangePassword'
import User from './Pages/User/User';
import Login from '../User/Auth/Login';
import SellerRegistration from '../User/Auth/SellerRegistration';
import Sellers from './Pages/Seller/Sellers';
import SellerLogin from '../User/Auth/SellerLogin';

export default function AdminRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/seller/register" element={<SellerRegistration />} />
            <Route exact path="/seller/login" element={<SellerLogin />} />
            <Route exact path="/admin/complaints" element={<ViewComplaint />} />
            <Route exact path="/admin/profile" element={<Profile />} />
            <Route exact path="/admin/profile/changePassword" element={<ChangePassword />} />

            <Route exact path="/admin/user" element={<User />} />
            <Route exact path="/admin/seller" element={<Sellers />} />
        </Routes>
    </BrowserRouter>
  )
}
