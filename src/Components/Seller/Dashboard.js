import React, { useEffect } from "react";
import "./dashboard.css";
import MainDash from "./MainDash";
import RightSide from "./RightSide";
import Sidebar from "./Sidebar";
import SellerSpeedDial from "./SellerSpeedDial/SellerSpeedDial";
import axios from "axios";
const Dashboard = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token },
      });
    };

    getData();
  }, []);
  return (
    <div className="dashboard">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="dashboardglass">
        <Sidebar />
        <MainDash />
        <RightSide />
      </div>
    </div>
  );
};

export default Dashboard;
