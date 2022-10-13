import React from "react";
import img1 from "../../../images/img1.png";
import { Rating } from "@mui/material";
const ReviewCard = ({ review }) => {
  console.log("review", review);
  return (
    <div className="reviewCard">
      <img src={img1} alt="user" />
      <p>{review.name}</p>
      <Rating value={review.rating} readOnly size="large" />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
