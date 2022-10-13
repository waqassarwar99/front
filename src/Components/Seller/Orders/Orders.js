import React from "react";
import Sidebar from "../Sidebar";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";

const Orders = () => {
  return (
    <div className="dashboard">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="dashboardglass">
        <Sidebar />
        <h1>Orders</h1>
      </div>
    </div>
  );
};

export default Orders;
