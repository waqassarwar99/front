import React from "react";
import img1 from "../../../images/img1.png";
import avatar from "../../../images/avata.png";
import { Rating } from "@mui/material";
const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <img src={avatar} alt="user" />
      <p>{review.name}</p>
      <Rating value={review.rating} readOnly fontSize="large" />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
