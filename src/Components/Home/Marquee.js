import React from "react";
import "./Photographers.css";
import brand1 from "../../images/brand1.jpg";
import star from "../../images/star.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
const Marquee = () => {
  return (
    <div style={{ marginTop: "60px", backgroundColor: "#F0F0F0" }}>
      <div style={{ marginLeft: "20px" }}>
        <h2>
          Find the Best
          <br />
          <span
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              fontFamily: "Roboto",
            }}
          >
            Marriage Halls and Marquees
          </span>
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="photographersCards">
          <img
            src={brand1}
            alt="service image"
            style={{
              width: "100%",
              height: "70%",
              objectFit: "cover",
              borderRadius: "2px",
              flexGrow: 1,
            }}
          />
          <div className="photograhphersDetails">
            <span>Farah Photography & Films</span>
            <div style={{ marginTop: "10px" }}>
              <img
                src={star}
                alt="rating"
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
              <span style={{ fontWeight: "bold", marginRight: "50px" }}>
                5 (7)
              </span>

              <LocationOnOutlinedIcon />
              <span style={{ fontWeight: "bold" }}>Islamabad</span>
            </div>
          </div>
        </div>
        <div className="photographersCards">
          <img
            src={brand1}
            alt="service image"
            style={{
              width: "100%",
              height: "70%",
              objectFit: "cover",
              borderRadius: "2px",
              flexGrow: 1,
            }}
          />
          <div className="photograhphersDetails">
            <span>Farah Photography & Films</span>
            <div style={{ marginTop: "10px" }}>
              <img
                src={star}
                alt="rating"
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
              <span style={{ fontWeight: "bold", marginRight: "50px" }}>
                5 (7)
              </span>

              <LocationOnOutlinedIcon />
              <span style={{ fontWeight: "bold" }}>Islamabad</span>
            </div>
          </div>
        </div>
        <div className="photographersCards">
          <img
            src={brand1}
            alt="service image"
            style={{
              width: "100%",
              height: "70%",
              objectFit: "cover",
              borderRadius: "2px",
              flexGrow: 1,
            }}
          />
          <div className="photograhphersDetails">
            <span>Farah Photography & Films</span>
            <div style={{ marginTop: "10px" }}>
              <img
                src={star}
                alt="rating"
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
              <span style={{ fontWeight: "bold", marginRight: "50px" }}>
                5 (7)
              </span>

              <LocationOnOutlinedIcon />
              <span style={{ fontWeight: "bold" }}>Islamabad</span>
            </div>
          </div>
        </div>
        <div className="photographersCards">
          <img
            src={brand1}
            alt="service image"
            style={{
              width: "100%",
              height: "70%",
              objectFit: "cover",
              borderRadius: "2px",
              flexGrow: 1,
            }}
          />
          <div className="photograhphersDetails">
            <span>Farah Photography & Films</span>
            <div style={{ marginTop: "10px" }}>
              <img
                src={star}
                alt="rating"
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
              <span style={{ fontWeight: "bold", marginRight: "50px" }}>
                5 (7)
              </span>

              <LocationOnOutlinedIcon />
              <span style={{ fontWeight: "bold" }}>Islamabad</span>
            </div>
          </div>
        </div>
        <div className="photographersCards">
          <img
            src={brand1}
            alt="service image"
            style={{
              width: "100%",
              height: "70%",
              objectFit: "cover",
              borderRadius: "2px",
              flexGrow: 1,
            }}
          />
          <div className="photograhphersDetails">
            <span>Farah Photography & Films</span>
            <div style={{ marginTop: "10px" }}>
              <img
                src={star}
                alt="rating"
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
              <span style={{ fontWeight: "bold", marginRight: "50px" }}>
                5 (7)
              </span>

              <LocationOnOutlinedIcon />
              <span style={{ fontWeight: "bold" }}>Islamabad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
