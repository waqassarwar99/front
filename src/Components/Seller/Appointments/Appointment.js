import React from "react";
import Sidebar from "../Sidebar";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";
import AppointmentList from "./AppointmentList";

const Appointment = () => {
  return (
    <div className="product">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="productglass">
        <Sidebar />

        <div>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              marginTop: "10px",
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            Bookings
          </h1>
          <div style={{ padding: "30px" }}>
            <AppointmentList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
