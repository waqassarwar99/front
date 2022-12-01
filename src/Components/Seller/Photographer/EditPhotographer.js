import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import { TextField, InputAdornment } from "@mui/material";
import {
  AccountTree,
  Description,
  Spellcheck,
  LocationOn,
  Phone,
  PriceCheck,
  ArticleOutlined,
  Article,
} from "@mui/icons-material";

import experience from "../../../images/experience.png";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";

const EditPhotographer = () => {
  const navigate = useNavigate();
  const location1 = useLocation();
  const product = location1.state;
  console.log(product);

  const editSellerServices = async (e) => {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append("file", file);

    // const res = await axios.post("/user/upload", formData, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    const editsellerservices = await axios.patch(
      `/service/editPhotographer/${product._id}`,
      {
        name: name ? name : product.name,
        description: description ? description : product.description,
        category: category ? category : product.category,
        location: location ? location : product.location,
        phoneNo: phoneNo ? phoneNo : product.phoneNo,
        // images: res.data.url,
        // policy: policy ? policy : product.policy,
        // experties: experties ? experties : product.experties,
        // basicPlan: basicPrice && basicService
        //   ? { price: basicPrice, addOns: basicService }
        //   : { price: product.basicPrice, addOns: product.basicService },
        // goldPlan: goldPrice && goldService
        //   ? { price: goldPrice, addOns: goldService }
        //   : { price: product.goldPrice, addOns: product.goldService },
        // platinumPlan: platinumPrice && platinumService
        //   ? { price: platinumPrice, addOns: platinumService }
        //   : {
        //       price: product.platinumPrice,
        //       addOns: product.platinumService,
        //     },
      }
    );
    navigate("/photographer");
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [experties, setExperties] = useState("");
  const [policy, setPolicy] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNo, setNumber] = useState("");
  const [basicPrice, setBasicPrice] = useState("");
  const [basicService, setBasicService] = useState("");
  const [goldPrice, setGoldPrice] = useState("");
  const [goldService, setGoldService] = useState("");
  const [platinumPrice, setPlatinumPrice] = useState("");
  const [platinumService, setPlatinumService] = useState("");

  const [file, setFile] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  return (
    <div className="product">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="productglass">
        <Sidebar />
        <div className="newProductContainer" style={{height:"90%"}}>
          <h1
            style={{
              color: "rgba(0, 0, 0, 0.733)",
              font: "300 2rem Roboto",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Edit Photographer
          </h1>
         
          <div className="addMarquee row">
            <div className="col-4">
              <div>
                <TextField
                  label="Name"
                  placeholder="Name"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  defaultValue={product.name}
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
                  defaultValue={product.description}
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
                  defaultValue={product.category}
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
                  defaultValue={product.phoneNo}
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
                  defaultValue={product.location}
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
                onClick={editSellerServices}
                style={{
                  width: "60%",
                  marginLeft: "10px",
                  fontWeight: "400",
                  fontSize: "20px",
                  padding: 10,
                }}
              >
                Edit
              </button>
            </div>
            <div className="col-4">
              <div>
                <TextField
                  label="Experties"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  defaultValue={product.experties}
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
                  defaultValue={product.policy}
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
                  defaultValue={product.basicPlan.price}
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
                  defaultValue={product.basicPlan.addOns}
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
                  defaultValue={product.goldPlan.price}
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
                  defaultValue={product.goldPlan.addOns}
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
                  defaultValue={product.platinumPlan.price}
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
                  defaultValue={product.platinumPlan.addOns}
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

export default EditPhotographer;
