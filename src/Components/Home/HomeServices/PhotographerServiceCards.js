import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserSpeedDial from "../SpeedDial/UserSpeedDial";
import axios from "axios";
import "./HomeServiceCards.css";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

import Navbar from "../Navbar";

// import card
import PhotographerCard from "./PhotographerCard";

const PhotographerServiceCard = () => {
  // Redux

  const auth = useSelector((state) => state.authReducer);

  const { isLogged } = auth;

  // Searching and filtering
  const search = async (e) => {
    e.preventDefault();
    const service = await axios.post("/service/searchservice", { keyword });
    setService(service.data);
  };

  const filterCity = async (e) => {
    const service = await axios.post("/service/city", { keyword: e.value });
    setCity(service.data);
  };

  const miniPrice = async () => {
    const service = await axios.get("/service/serviceminPrice");
    return setFilteredData(service.data);
  };

  const maxiPrice = async () => {
    const service = await axios.get("/service/servicemaxPrice");
    setFilteredData(service.data);
  };

  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    axios
      .get("/service/viewPhotographer")
      .then((data) => {
        setData(data.data);
        setFilteredData(data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    filtering();
  }, [keyword, city, minPrice, maxPrice]);

  const [service, setService] = useState([]);

  const filtering = () => {
    if (keyword === "" && city === "All" && minPrice === 0 && maxPrice === 0) {
      console.log("filtering", data);
      return setFilteredData(data);
    } else if (keyword !== "") {
      console.log(data, "Data");
      let data1 = data.filter((e) => e.name.startsWith(keyword));
      return setFilteredData(data1);
    } else if (keyword === "" && city !== "All") {
      console.log("city");
      let data1 = data.filter((e) => e.location === city);
      return setFilteredData(data1);
    } else if (keyword !== "" && city !== "All") {
      let data1 = data.filter(
        (e) => e.name.startsWith(keyword) && e.location === city
      );
      return setFilteredData(data1);
    } else if (minPrice !== 0) {
      console.log(minPrice);
      minPrice === "lowest" ? miniPrice() : maxiPrice();
    } else if (keyword !== "" && city !== "All" && minPrice !== 0) {
      let data1 = data.filter(
        (e) => e.name.startsWith(keyword) && e.location === city
      );
      return setFilteredData(data1);
    }
  };
  return (
    <>
      <Navbar />
      {isLogged ? (
        <div>
          <UserSpeedDial />
        </div>
      ) : null}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Search and Filtering */}
        <div
          style={{
            backgroundColor: "#E5E4E2",
            position: "relative",
            width: "240px",
            height: "auto",
            padding: "15px",
            marginTop: "20px",
            marginLeft: "20px",
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

          <div>
            <form>
              <input
                type="text"
                placeholder="Search..."
                name="search"
                onChange={(e) => setKeyword(e.target.value)}
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  height: "40px",
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
              <div className="form-check" style={{ marginBottom: "20px" }}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="Islamabad"
                  value="Islamabad"
                  id="flexRadioDefault1"
                  style={{ marginRight: "10px" }}
                  onChange={(e) => setCity(e.target.value)}
                />
                <label className="form-check-label">Islamabad</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Islamabad"
                  value="Rawalpindi"
                  id="flexRadioDefault1"
                  style={{
                    marginRight: "5px",
                  }}
                  onChange={(e) => setCity(e.target.value)}
                />
                Rawalpindi
                <label className="form-check-label"></label>
              </div>
            </div>
            <Divider sx={{ marginBottom: "20px" }} />

            {/* <div
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
                <input
                  type="text"
                  name="subarea"
                  placeholder="e.g. G-10 Markaz"
                />
              </label>
            </div> */}

            {/* <Divider sx={{ marginTop: "20px", marginBottom: "10px" }} /> */}

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
                <div className="form-check" style={{ marginBottom: "20px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="lowest"
                    value="lowest"
                    id="flexRadioDefault1"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <label className="form-check-label">Lowest To Highest</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="lowest"
                    value="highest"
                    id="flexRadioDefault1"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <label className="form-check-label">Highest To Lowest</label>
                </div>
              </div>
              <Divider sx={{ marginBottom: "10px" }} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          {filteredData.map((e) =>
            e.category === "Photographer" ? <PhotographerCard data={e} /> : null
          )}
        </div>
      </div>
    </>
  );
};
export default PhotographerServiceCard;
