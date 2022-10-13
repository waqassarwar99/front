import React from "react";
import Sidebar from "../Sidebar";
import "./Products.css";
import SellerProducts from "./SellerProducts";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";
const Products = () => {
  return (
    <div className="product">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="productglass">
        <Sidebar />
        <SellerProducts />
      </div>
    </div>
  );
};

export default Products;
