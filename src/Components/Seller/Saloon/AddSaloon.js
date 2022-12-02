import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment } from "@mui/material";
import Sidebar from "../Sidebar";
import experience from "../../../images/experience.png";
import "../Services/addService.css";
import {
  AccountTree,
  Description,
  Spellcheck,
  LocationOn,
  Phone,
  House,
  DirectionsCar,
  PriceCheck,
  Article,
  ArticleOutlined,
} from "@mui/icons-material";

import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";

const AddSaloon = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token },
      });
      setUserId(res.data._id);
    };

    getData();
  }, []);

  const addService = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (file === "") {
      alert("Please select an image");
    } else {
      formData.append("file", file);

      const res = await axios.post("/user/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const addservice = await axios.post("/service/addPhotographer", {
        name,
        description,
        category,
        location,
        phoneNo,
        seller: userId,
        images: res.data.url,
        experties,
        policy,
        basicPlan: {
          price: basicPrice,
          addOns: basicService,
        },
        goldPlan: {
          price: goldPrice,
          addOns: goldService,
        },
        platinumPlan: { price: platinumPrice, addOns: platinumService },
      });
      console.log(addservice);
      if (addservice.data.msg == "Added") {
        navigate("/saloon");
      } else {
        alert("Please fill all the fields");
      }
    }
  };
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNo, setNumber] = useState("");
  const [experties, setExperties] = useState("");
  const [policy, setPolicy] = useState("");
  const [basicPrice, setBasicPrice] = useState();
  const [basicService, setBasicService] = useState("");
  const [goldPrice, setGoldPrice] = useState();
  const [goldService, setGoldService] = useState("");
  const [platinumPrice, setPlatinumPrice] = useState();
  const [platinumService, setPlatinumService] = useState("");
  const [images, setImages] = useState("");
  const [file, setFile] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  return (
    <div className="product">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="productglass">
        <Sidebar />
        <div className="newProductContainer" style={{ height: "90%" }}>
          <h1
            style={{
              color: "rgba(0, 0, 0, 0.733)",
              font: "300 2rem Roboto",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Add Saloon
          </h1>

          {/* Form  Start*/}
          <div className="addMarquee row">
            <div className="col-4">
              <div>
                <TextField
                  label="Name"
                  placeholder="Name"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Spellcheck />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <TextField
                  label="Description"
                  placeholder="Description"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <TextField
                  label="Category"
                  placeholder="Category"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountTree />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Phone No"
                  placeholder="Phone No"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={phoneNo}
                  onChange={(e) => setNumber(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <TextField
                  label="Location"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={location}
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <button
                id="createProductBtn"
                type="submit"
                onClick={addService}
                style={{
                  width: "60%",
                  marginLeft: "10px",
                  fontWeight: "400",
                  fontSize: "20px",
                  padding: 10,
                }}
              >
                Create
              </button>
            </div>
            <div className="col-4">
              <div>
                <TextField
                  label="Experties"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={experties}
                  placeholder="Experties"
                  onChange={(e) => setExperties(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={experience} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Cancelation Policy"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={policy}
                  placeholder="Cancelation Policy"
                  onChange={(e) => setPolicy(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ArticleOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <TextField
                  label="Basic Plan Price"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={basicPrice}
                  placeholder="Basic Plan Price"
                  onChange={(e) => setBasicPrice(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PriceCheck />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <TextField
                  label="Basic Plan Services"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={basicService}
                  placeholder="Basic Plan Services"
                  onChange={(e) => setBasicService(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Article />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <TextField
                  label="Gold Plan Price"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={goldPrice}
                  placeholder="Gold Plan Price"
                  onChange={(e) => setGoldPrice(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PriceCheck />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="col-4">
              <div>
                <TextField
                  label="Gold Plan Services"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={goldService}
                  placeholder="Gold Plan Services"
                  onChange={(e) => setGoldService(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Article />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Platinum Plan Price"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={platinumPrice}
                  placeholder="Platinum Plan Price"
                  onChange={(e) => setPlatinumPrice(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PriceCheck />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Platinum Plan Services"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={platinumService}
                  placeholder="Platinum Plan Services"
                  onChange={(e) => setPlatinumService(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Article />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>{" "}
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSaloon;
