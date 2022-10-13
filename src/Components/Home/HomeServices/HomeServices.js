import React from "react";
import { useSelector } from "react-redux";

import Navbar from "../Navbar";
import HomeServiceCards from "./HomeServiceCards";
import UserSpeedDial from "../SpeedDial/UserSpeedDial";
const HomeServices = () => {
  const auth = useSelector((state) => state.authReducer);

  const { isLogged } = auth;
  return (
    <div>
      <Navbar />
      {isLogged ? (
        <div>
          <UserSpeedDial />
        </div>
      ) : null}
      <div
        className="servicesList"
        // style={{
          
        //   // display: "flex",
        //   // flexWrap: "wrap",
        // }}
      >
        <HomeServiceCards />
      </div>
    </div>
  );
};

export default HomeServices;
