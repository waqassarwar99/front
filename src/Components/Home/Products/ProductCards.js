import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import star from "../../../images/star.png";
import rupee from "../../../images/pakistani.png";
import { Divider } from "@mui/material";

const ProductCards = () => {
  const navigate = useNavigate();

  const search = async (e) => {
    e.preventDefault();
    const service = await axios.post("/product/searchProduct", { keyword });
    setService(service.data);
  };

  const filterCity = async (e) => {
    const service = await axios.post("/product/city", { keyword: e.value });
    setCity(service.data);
  };

  const miniPrice = async () => {
    const service = await axios.get("/product/minPrice");
    return setFilteredData(service.data);
  };

  const maxiPrice = async () => {
    const service = await axios.get("/product/maxPrice");
    setFilteredData(service.data);
  };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [service, setService] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const product = await axios.get("/product/viewproduct");
      setData(product.data);
      setFilteredData(product.data);
    };

    getData();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("/product/viewproduct")
  //     .then((data) => {
  //       setData(data.data);
  //       setFilteredData(data.data);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  useEffect(() => {
    filtering();
  }, [keyword, city, minPrice, maxPrice]);

  const filtering = () => {
    if (keyword === "" && city === "All" && minPrice === 0 && maxPrice === 0) {
      return setFilteredData(data);
    } else if (keyword !== "") {
      let data1 = data.filter((e) => e.name.startsWith(keyword));
      return setFilteredData(data1);
    } else if (keyword === "" && city !== "All") {
      let data1 = data.filter((e) => e.location === city);
      return setFilteredData(data1);
    } else if (keyword !== "" && city !== "All") {
      let data1 = data.filter(
        (e) => e.name.startsWith(keyword) && e.location === city
      );
      return setFilteredData(data1);
    } else if (minPrice !== 0) {
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
      {/* Search and filtering */}
      <div style={{ display: "flex", gap: "30px" }}>
        <div
          style={{
            backgroundColor: "#E5E4E2",
            position: "relative",
            width: "240px",
            height: "auto",
            padding: "15px",
            marginTop: "20px",
            // marginLeft: "20px",
            gap: "30px",
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
            <div
              className="cityFilter"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
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
                <div className="form-check">
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
                    value="highest  "
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

        {/* Product Card */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "10px",
            gap: "30px",
          }}
        >
          {data.map((data) => (
            <div
              // className="cardContainer"
              onClick={() => navigate("/productdetails", { state: data })}
            >
              <div className="photographersCards">
                <img
                  src={data.images}
                  alt="service image"
                  style={{
                    width: "242px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div className="photograhphersDetails">
                  <div>
                    <span
                      style={{
                        fontFamily: "poppins-semi-bold, sans-serif",
                        /* font-family: Roboto; */
                        fontSize: "15px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        fontWeight: "600",
                      }}
                    >
                      {data.name}
                    </span>
                    <img
                      src={star}
                      alt="rating"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "15px",
                      }}
                    />
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      {data.ratings.toFixed(2)} ({data.numOfReviews})
                    </span>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <img src={rupee} alt="rupee" />
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginLeft: "10px",
                        marginRight: "60px",
                      }}
                    >
                      {data.price}
                    </span>
                    <LocationOnOutlinedIcon />
                    <span style={{ fontWeight: "bold" }}>Islamabad</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCards;
