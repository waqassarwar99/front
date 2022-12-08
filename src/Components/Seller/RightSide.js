import React from "react";
import CustomerReview from "./CustomerReview";
import Updates from "./Updates";
const RightSide = () => {
  return (
    <div className="RightSide">
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ fontFamily: "Dancing Script", fontSize:"35px", fontWeight:"600" }}>Updates</h3>
        <Updates />
      </div>
      {/* <div>
        <h3>Customer Reviews</h3>
        <CustomerReview />
      </div> */}
    </div>
  );
};

export default RightSide;
