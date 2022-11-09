import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Login from "./Auth/Login";
import Home from "../Home/Home";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import SellerRegistration from "./Auth/SellerRegistration";
import SellerLogin from "./Auth/SellerLogin";
import SellerDashboard from "../Seller/Dashboard";
import SellerProfile from "../Seller/Profile/SellerProfile";
import SellerProducts from "../Seller/SellerProducts/Products";
import Orders from "../Seller/Orders/Orders";
import AddProduct from "../Seller/SellerProducts/AddProduct";
import Appointment from "../Seller/Appointments/Appointment";
import EditProduct from "../Seller/SellerProducts/EditProduct";
import SellerServices from "../Seller/Services/SellerServices";
import AddService from "../Seller/Services/AddService";
import EditService from "../Seller/Services/EditService";
import Products from "../Home/Products/HomeProducts";
import ProductDetails from "../Home/Products/ProductDetails";
import HomeServices from "../Home/HomeServices/HomeServices";
import ServiceDetails from "../Home/HomeServices/ServiceDetails";
import Subscription from "../Home/HomeServices/Subscription";
import Filter from "../SearchAndFilter/Filter";
import Cart from "../Checkout/Cart";
import AddressForm from "../Checkout/AddressForm";
import PaymentForm from "../Checkout/PaymentForm";
import PhotographerPaymentForm from "../Checkout/PhotographerPaymentForm";
import PhotographerCheckoutForm from "../Checkout/PhotographerCheckoutForm";
import Checkout from "../Checkout/CheckOut";
import ConfirmPayment from "../Checkout/ConfirmPayment";
import Photographer from "../Seller/Photographer/Photographer";
import AddPhotographer from "../Seller/Photographer/AddPhotographer";
import EditPhotographer from "../Seller/Photographer/EditPhotographer";
import Saloon from "../Seller/Saloon/Saloon";
import AddSaloon from "../Seller/Saloon/AddSaloon";

import SaloonServicesCard from "../Home/HomeServices/SaloonServicesCard";
import SaloonPaymentForm from "../Checkout/SaloonPaymentForm";
import PhotographerServiceCard from "../Home/HomeServices/PhotographerServiceCards";

import PhotographerDetails from "../Home/HomeServices/PhotographerDetails";
import PhotographerSubscription from "../Home/HomeServices/PhotographerSubscription";
import SaloonDetails from "../Home/HomeServices/SaloonDetails";
import SaloonSubscription from "../Home/HomeServices/SaloonSubscription";
import EditSaloon from "../Seller/Saloon/EditSaloon";

import UserMainChat from "../UserChat/MainChat";
import ClientProfile from "../Home/Profile/ClientProfile";
import Testing from "../Home/HomeServices/Testing";
import MainChat from "../Chat/MainChat";

// Invitation Card

import CardGenerator from "../Card Generator/CardGenerator";
import WalimaCard from "../Card Generator/WalimaCard";
const stripePromise = loadStripe(
  "sk_test_51Kr2oHDGZefk1hIJPmvj4miJ6yZMVPKPpO1vTh33XktHv1jxMf41PF4qZytZNGDKWwH0c70tI5bzWVbrNDPqeGro00jiI06fND"
);

export default function UserRoute() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Testing />} />

            <Route path="/userProfile" element={<ClientProfile />} />
            <Route path="/userchat" element={<UserMainChat />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productdetails" element={<ProductDetails />} />
            <Route path="/services" element={<HomeServices />} />
            <Route path="/saloons" element={<SaloonServicesCard />} />
            <Route path="/saloondetails" element={<SaloonDetails />} />
            <Route
              path="/saloonsubscription"
              element={<SaloonSubscription />}
            />
            <Route
              path="/photographers"
              element={<PhotographerServiceCard />}
            />
            <Route
              path="/photographerdetails"
              element={<PhotographerDetails />}
            />
            <Route
              path="/photographersubscription"
              element={<PhotographerSubscription />}
            />
            <Route path="/servicedetails" element={<ServiceDetails />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/photogaphercheckout"
              element={<PhotographerCheckoutForm />}
            />
            <Route path="/addressform" element={<AddressForm />} />
            <Route path="/paymentform" element={<PaymentForm />} />
            <Route
              path="/photographerpaymentform"
              element={<PhotographerPaymentForm />}
            />
            <Route path="/saloonpaymentform" element={<SaloonPaymentForm />} />
            <Route path="/confirmPayment" element={<ConfirmPayment />} />
            <Route path="/seller/register" element={<SellerRegistration />} />
            <Route path="/seller/login" element={<SellerLogin />} />
            <Route path="/seller/profile" element={<SellerProfile />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/dashboard" element={<SellerDashboard />} />
            <Route path="/sellerproducts" element={<SellerProducts />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/editproduct" element={<EditProduct />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/marquees" element={<SellerServices />} />
            <Route path="/addservice" element={<AddService />} />
            <Route path="/editservice" element={<EditService />} />
            <Route path="/photographer" element={<Photographer />} />
            <Route path="/addphotographer" element={<AddPhotographer />} />
            <Route path="/editphotographer" element={<EditPhotographer />} />
            <Route path="/saloon" element={<Saloon />} />
            <Route path="/addsaloon" element={<AddSaloon />} />
            <Route path="/editsaloon" element={<EditSaloon />} />
            <Route path="/sellerChat" element={<MainChat />} />

            {/* Card generator */}
            <Route path="/cardGenerator" element={<CardGenerator />} />
            <Route path="/walimaCard" element={<WalimaCard />} />
          </Routes>
        </BrowserRouter>
      </Elements>
    </div>
  );
}
