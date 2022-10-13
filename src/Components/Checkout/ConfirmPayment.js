import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Home/Navbar";
import "./ConfirmPayment.css";
import UserSpeedDial from "../Home/SpeedDial/UserSpeedDial";
const ConfirmPayment = () => {
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
      <div className="confirm">
        <span className="confirm1">Thanks</span>
        <span className="confirm1">For</span>
        <span className="confirm1">Your</span>
        <span className="confirm1">Order!</span>
      </div>
    </div>
  );
};

export default ConfirmPayment;
