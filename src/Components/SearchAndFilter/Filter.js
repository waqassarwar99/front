import React, { useState } from "react";
import { Divider } from "@mui/material";

const Filter = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/services/${keyword}`);
    } else {
      history.push("/services");
    }
  };
  return (
    <div
      className="filterContainerr"
      style={{
        backgroundColor: "#E5E4E2",
        width: "300px",
        height: "auto",
        padding: "15px",
      }}
    >
      <p
        style={{
          fontSize: "17px",
          textTransform: "uppercase",
          display: "inline-block",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}
      >
        Filter
      </p>
      <Divider />

      <div className="search">
        <form onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search..."
            name="search"
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              marginTop: "10px",

              marginBottom: "10px",
              height: "40px",
              justifyContent: "space-between",
              border: "2px solid black",
              borderRadius: "7px",
              padding: "5px",
            }}
          />
        </form>
      </div>

      <Divider />
      <div className="filterList">
        <span
          style={{
            fontWeight: "600",
            display: "inline-block",
            marginTop: "10px",
            fontSize: "15px",
          }}
        >
          City
        </span>
        <div className="cityFilter" style={{ padding: "10px" }}>
          <label className="checkbox">
            <input
              type="checkbox"
              name="islamabad"
              style={{ marginRight: "10px" }}
            />
            Islamabad
          </label>
          <label className="checkbox" style={{ marginLeft: "50px" }}>
            <input
              type="checkbox"
              name="rawalpindi"
              style={{ marginRight: "10px" }}
            />
            Rawalpindi
          </label>
        </div>
        <Divider sx={{ marginBottom: "20px" }} />

        <div
          className="subAreaFilter"
          style={{
            height: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid #d0d0d0",
            borderRadius: "7px",
            padding: "5px",
          }}
        >
          <span style={{ fontWeight: "bold", display: "inline-block" }}>
            Sub Area
          </span>
          <label className="subArea">
            <input type="text" name="subarea" placeholder="e.g. G-10 Markaz" />
          </label>
        </div>

        <Divider sx={{ marginTop: "20px", marginBottom: "10px" }} />

        <div
          className="priceList"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span
            style={{
              fontWeight: "600",
              display: "inline-block",
              marginTop: "10px",
              fontSize: "15px",
            }}
          >
            Price
          </span>
          <div className="cityFilter" style={{ padding: "10px" }}>
            <label className="checkbox">
              <input
                type="checkbox"
                name="islamabad"
                style={{ marginRight: "10px" }}
              />
              Lowest Price
            </label>
            <label className="checkbox" style={{ marginLeft: "22px" }}>
              <input
                type="checkbox"
                name="rawalpindi"
                style={{ marginRight: "10px" }}
              />
              Highest Price
            </label>
          </div>
          <Divider sx={{ marginBottom: "10px" }} />
        </div>
      </div>
    </div>
  );
};

export default Filter;
