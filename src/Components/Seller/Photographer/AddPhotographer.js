import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import "../Services/addService.css";
import {
  AccountTree,
  Description,
  Spellcheck,
  LocationOn,
  Phone,
  PriceCheck,
  ArticleOutlined,
} from "@mui/icons-material";

import experience from "../../../images/experience.png";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";

const AddPhotographer = () => {
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
    navigate("/photographer");
  };
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");

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
        <div className="newProductContainer" style={{ marginLeft: "20px" }}>
          <h1
            style={{
              color: "rgba(0, 0, 0, 0.733)",
              font: "300 2rem Roboto",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Add Photographer
          </h1>

          {/* Form  Start*/}
          <div className="addMarquee row">
            <div className="col-4">
              <div>
                <Spellcheck />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Description />

                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="22"
                  rows="1"
                ></textarea>
              </div>

              <div>
                <AccountTree />
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <Phone />
                <input
                  type="text"
                  placeholder="Phone No"
                  value={phoneNo}
                  required
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              <div>
                <LocationOn />
                <input
                  type="string"
                  placeholder="Location"
                  value={location}
                  required
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="col-4">
              <div>
                <img
                  src={experience}
                  width={25}
                  height={25}
                  style={{
                    position: "absolute",
                    transform: "translateY(1vmax)",
                    marginLeft: "15px",
                  }}
                />
                <input
                  type="string"
                  placeholder="Experties"
                  value={experties}
                  required
                  onChange={(e) => setExperties(e.target.value)}
                />
              </div>
              <div>
                <ArticleOutlined />
                <input
                  type="string"
                  placeholder="Cancelation Policy"
                  value={policy}
                  required
                  onChange={(e) => setPolicy(e.target.value)}
                />
              </div>

              <div>
                <PriceCheck />
                <input
                  type="number"
                  placeholder="Basic Plan Price"
                  value={basicPrice}
                  onChange={(e) => setBasicPrice(e.target.value)}
                  cols="22"
                  rows="1"
                ></input>
              </div>

              <div>
                <PriceCheck />
                <textarea
                  placeholder="Basic Plan services"
                  onChange={(e) => setBasicService(e.target.value)}
                  cols="22"
                  rows="1"
                ></textarea>
              </div>

              <div>
                <PriceCheck />
                <input
                  type="number"
                  placeholder="Gold Plan Price"
                  value={goldPrice}
                  onChange={(e) => setGoldPrice(e.target.value)}
                  cols="22"
                  rows="1"
                ></input>
              </div>
            </div>
            <div className="col-4">
              <div>
                <PriceCheck />
                <textarea
                  placeholder="Gold Plan Services"
                  onChange={(e) => setGoldService(e.target.value)}
                  cols="22"
                  rows="1"
                ></textarea>
              </div>
              <div>
                <PriceCheck />
                <input
                  type="text"
                  placeholder="Platinum Plan Price"
                  value={platinumPrice}
                  onChange={(e) => setPlatinumPrice(e.target.value)}
                  cols="22"
                  rows="1"
                ></input>
              </div>
              <div>
                <PriceCheck />
                <textarea
                  placeholder="Platinum Plan Services"
                  value={platinumService}
                  onChange={(e) => setPlatinumService(e.target.value)}
                  cols="22"
                  rows="1"
                ></textarea>
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

            <button id="createProductBtn" type="submit" onClick={addService}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPhotographer;
