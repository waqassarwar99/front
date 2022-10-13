import React from "react";
import Sidebar from "../Sidebar";
import "./services.css";
import ServiceCards from "./ServiceCards";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";
const SellerServices = () => {
  return (
    <div className="dashboard">
      <SellerSpeedDial />
      <div className="serviceglass">
        <Sidebar />
        <ServiceCards />
      </div>
    </div>
  );
};

export default SellerServices;
