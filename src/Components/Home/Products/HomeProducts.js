import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import ProductCards from "./ProductCards";
import Filter from "../../SearchAndFilter/Filter";
import UserSpeedDial from "../SpeedDial/UserSpeedDial";
const Products = () => {
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
        className="productsList"
        style={{
          marginLeft: "20px",
          display: "flex",
          flexWrap: "wrap",
          // justifyContent: "space-around",
        }}
      >
        <ProductCards />
      </div>
    </div>
  );
};

export default Products;
