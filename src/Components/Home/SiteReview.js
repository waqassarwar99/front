import React from "react";
import siteReview from "../../images/siteReview.jpg";
import avatar from "../../images/sajjad.jpeg";
import { Rating } from "@mui/material";
import { Favorite } from "@mui/icons-material";
const SiteReview = () => {
  return (
    <div style={{ display: "flex" }}>
      <img
        src={siteReview}
        alt="site Review"
        style={{ width: "750px", height: "550px" }}
      />
      <div>
        <h1 style={{ fontFamily: "cursive", marginBottom: "60px" }}>
          What Our Client Says
        </h1>
        <div className="reviewCard" style={{ width: "500px" }}>
          <div
            style={{
              display: "flex",
              marginLeft: "-90px",
              marginTop: "-30px",
              marginBottom:"20px"
            }}
          >
            <img
              src={avatar}
              alt="user"
              style={{ borderRadius: "50%", width: "150px", height: "150px" }}
            />
            <div style={{display:"flex", flexDirection:"column"}}>
                
            <p style={{ fontSize: "20px", fontWeight: "700", marginTop:"30px", marginLeft:"20px" }}>Sajjad Akhtar</p>
            <div style={{scale:"130%"}}>
                
            <Rating readOnly  defaultValue={5} fontSize="large" sx={{marginLeft:"30px", color:"#ff6666"}}  icon={<Favorite />}/>
            </div>
            </div>
          </div>
          <span className="reviewCardComment">
            {" "}
            It took me a lot of time to find a make up artist for my wedding. I
            wish I had Shadiyana back then.{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SiteReview;
