import React from "react";
import { useNavigate } from "react-router-dom";
import star from "../../../images/star.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
const SaloonCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "inline-block", marginRight: "20px" }}>
      <div
        className="cardContainer"
        onClick={() => navigate("/saloondetails", { state: data })}
      >
        <div className="brandPicture" style={{ display: "block" }}>
          <img
            src={data.images}
            alt="brandimg"
            style={{ width: "180px", height: "232px" }}
          />
        </div>
        <div className="cardInfo">
          <div className="cardHeader">
            <span style={{ fontSize: "25px", fontFamily: "Dancing Script" }}>
              {data.name}
            </span>

            <div className="cardHeaderDetails">
              <img
                src={star}
                alt="Rating"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "10px",
                }}
              />
              <span>
                {data.ratings} ({data.numOfReviews})
              </span>
            </div>
          </div>
          <div className="cardDescription">{data.description}</div>
          <div>
            <LocationOnOutlinedIcon /> {data.location}
          </div>
          <div className="cardFooter">
            <p>
              Starting at <strong>PKR</strong>{" "}
              <strong>{data.basicPlan.price}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaloonCard;
