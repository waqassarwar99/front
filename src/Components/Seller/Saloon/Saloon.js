import React from "react";
import Sidebar from "../Sidebar";
import SaloonCard from "./SaloonCard";
import "../SellerProducts/Products.css";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";
const Photographer = () => {
  return (
    <div className="product">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="productglass">
        <Sidebar />
        <SaloonCard />
      </div>
    </div>
  );
};

export default Photographer;
