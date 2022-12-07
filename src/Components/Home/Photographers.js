import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Photographers.css";
import { useNavigate } from "react-router-dom";
import star from "../../images/star.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
const Photographers = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/service/viewSortedPhotographer")
      .then((data) => {
        setData(data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div style={{ marginTop: "60px", backgroundColor: "#F0F0F0" }}>
      <div
        style={{
          display: "flex",
          width: "auto",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        <h2 style={{ marginTop: "20px", marginLeft:"40px" }}>
          Find the Best
          <br />
          <span
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              fontFamily: "avant-semi-bold",
              marginTop: "20px",
            }}
          >
            Photographers
          </span>
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {data.map((data) => (
          <div
            className="photographersCards"
            key={data._id}
            onClick={() => navigate("/photographerdetails", { state: data })}
            style={{ cursor: "pointer" }}
          >
            <img
              src={data.images}
              alt="service"
              style={{
                width: "318px",
                height: "68%",
                objectFit: "cover",
                borderRadius: "5px",
                flexGrow: 1,
              }}
            />
            <div className="photograhphersDetails">
              <span>{data.name}</span>
              <div style={{ marginTop: "10px" }}>
                <img
                  src={star}
                  alt="rating"
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                <span style={{ fontWeight: "bold", marginRight: "50px" }}>
                  {data.ratings.toFixed(2)} ({data.numOfReviews})
                </span>

                <LocationOnOutlinedIcon />
                <span style={{ fontWeight: "bold" }}>{data.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photographers;
