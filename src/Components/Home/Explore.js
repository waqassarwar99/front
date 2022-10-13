import React from "react";
import { useNavigate } from "react-router-dom";
import "./Explore.css";
import arch from "../../images/arch.png";
import camera from "../../images/camera.png";
import makeup from "../../images/makeup.png";
const Explore = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          justifyContent: "centet",
          fontFamily: "Roboto",
          color: "red",
          fontWeight: "bold",
        }}
      >
        <h2>Explore The Market</h2>
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
        <div className="weddingVenue" onClick={() => navigate("/services")}>
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
          style={{ marginLeft: "80px", marginRight: "80px" }}
        >
          <img
            src={camera}
            alt="wedding venue logo"
            style={{ width: "50px", height: "50px", marginBottom: "20px" }}
          />
          PHOTOGRAPHERS
        </div>
        <div className="weddingVenue" onClick={() => navigate("/saloons")}>
          <img
            src={makeup}
            alt="wedding venue logo"
            style={{ width: "50px", height: "50px", marginBottom: "20px" }}
          />
          MAKEUP ARTISTS
        </div>
      </div>
    </div>
  );
};

export default Explore;
