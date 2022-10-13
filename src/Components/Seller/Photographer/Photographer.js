import React from "react";
import Sidebar from "../Sidebar";
import PhotographerCard from "./PhotographerCard";
import "../SellerProducts/Products.css";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";
const Photographer = () => {
  return (
    <div className="service">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="serviceglass">
        <Sidebar />
        <PhotographerCard />
      </div>
    </div>
  );
};

export default Photographer;
