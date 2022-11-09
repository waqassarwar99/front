import React, {useEffect, useState} from "react";
import axios from "axios"
import "./Photographers.css";

import star from "../../images/star.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
const Photographers = () => {

  const [data,setData] = useState([])
  
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
      <div style={{ marginLeft: "20px" }}>
        <h2>
          Find the Best
          <br />
          <span
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              fontFamily: "Vallenta", //Nunito
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
          justifyContent: "center",
        }}
      >
        {data.map((data)=>(
        <div className="photographersCards">
          <img
            src={data.images}
            alt="service"
            style={{
              width: "100%",
              height: "70%",
              objectFit: "cover",
              borderRadius: "2px",
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
                {data.ratings} ({data.numOfReviews})
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
