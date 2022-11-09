import React from "react";
import { useNavigate } from "react-router-dom";
import star from "../../../images/star.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
const Card = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "inline-block", marginRight: "30px" }}>
      <div
        className="cardContainer"
        onClick={() => navigate("/servicedetails", { state: data })}
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
            <span>{data.name}</span>
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
                {data.ratings.toFixed(2)} ({data.numOfReviews})
              </span>
            </div>
          </div>

          <div className="cardDescription">{data.description}</div>
          <div
            style={{ fontWeight: "500", fontSize: "15px", marginLeft: "10px" }}
          >
            <LocationOnOutlinedIcon />
            {data.location}
          </div>
          <div className="cardFooter">
            <p>
              Starting at <strong>PKR</strong>{" "}
              <strong>{data.basicPlan[0].basicPrice}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
