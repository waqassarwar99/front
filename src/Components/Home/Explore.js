import React from "react";
import { useNavigate } from "react-router-dom";
import "./Explore.css";
import arch from "../../images/arch.png";
import camera from "../../images/camera.png";
import makeup from "../../images/makeup.png";
import howitworks from "../../images/howitworks.png";
const Explore = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          justifyContent: "centet",

          color: "red",
          

          marginBottom: "30px",
        }}
      >
        <h2 style={{ fontFamily: "avant-semi-bold", fontSize: "40px",fontWeight: "700", }}>
          Explore The Market
        </h2>
      </div>

      <div
        className="exploreCards"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="weddingVenue"
          onClick={() => navigate("/services")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={arch}
            alt="wedding venue logo"
            style={{ width: "50px", height: "50px", marginBottom: "20px" }}
          />
          WEDDING VENUES
        </div>
        <div
          className="weddingVenue"
          onClick={() => navigate("/photographers")}
          style={{ marginLeft: "80px", marginRight: "80px", cursor: "pointer" }}
        >
          <img
            src={camera}
            alt="wedding venue logo"
            style={{ width: "50px", height: "50px", marginBottom: "20px" }}
          />
          PHOTOGRAPHERS
        </div>
        <div
          className="weddingVenue"
          onClick={() => navigate("/saloons")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={makeup}
            alt="wedding venue logo"
            style={{ width: "50px", height: "50px", marginBottom: "20px" }}
          />
          MAKEUP ARTISTS
        </div>
      </div>
      <img
        src={howitworks}
        alt="how it works"
        style={{ width: "100%", height: "100%", marginTop: "50px" }}
      />
    </div>
  );
};

export default Explore;
