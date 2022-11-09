import React, { useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";
import "./maindash.css";
import Table from "./Table";

const MainDash = () => {
  return (
    <div className="MainDash" >
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Dancing Script",
          marginTop: "-50px",
          fontWeight: "600",
          marginBottom: "-40px",
        }}
      >
        Dashboard
      </h1>
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
