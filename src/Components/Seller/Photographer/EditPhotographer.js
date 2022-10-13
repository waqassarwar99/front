import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";

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

const EditPhotographer = () => {
  const navigate = useNavigate();
  const location1 = useLocation();
  const product = location1.state;

  const editSellerServices = async (e) => {
    console.log(product)
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
        policy: policy ? policy : product.policy,
        experties: experties ? experties : product.experties,
        basicPlan: basicPrice && basicService
          ? { price: basicPrice, addOns: basicService }
          : { price: product.basicPrice, addOns: product.basicService },
        goldPlan: goldPrice && goldService
          ? { price: goldPrice, addOns: goldService }
          : { price: product.goldPrice, addOns: product.goldService },
        platinumPlan: platinumPrice && platinumService
          ? { price: platinumPrice, addOns: platinumService }
          : {
              price: product.platinumPrice,
              addOns: product.platinumService,
            },
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
        <div className="newProductContainer">
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
                <Spellcheck />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  defaultValue={product.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Description />

                <textarea
                  placeholder="Description"
                  defaultValue={product.description}
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
                  defaultValue={product.category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <Phone />
                <input
                  type="text"
                  placeholder="Phone No"
                  defaultValue={product.phoneNo}
                  required
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              <div>
                <LocationOn />
                <input
                  type="string"
                  placeholder="Location"
                  defaultValue={product.location}
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
                  defaultValue={product.experties}
                  required
                  onChange={(e) => setExperties(e.target.value)}
                />
              </div>
              <div>
                <ArticleOutlined />
                <input
                  type="string"
                  placeholder="Cancelation Policy"
                  defaultValue={product.policy}
                  required
                  onChange={(e) => setPolicy(e.target.value)}
                />
              </div>
              <div>
                <PriceCheck />
                <input
                  type="number"
                  placeholder="Basic Plan Price"
                  defaultValue={
                    product.basicPlan ? product.basicPlan.price : null
                  }
                  onChange={(e) => setBasicPrice(e.target.value)}
                ></input>
              </div>

              <div>
                <PriceCheck />
                <textarea
                  placeholder="Basic Plan services"
                  defaultValue={
                    product.basicPlan ? product.basicPlan.addOns : null
                  }
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
                  defaultValue={
                    product.goldPlan ? product.goldPlan.price : null
                  }
                  onChange={(e) => setGoldPrice(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="col-4">
              <div>
                <PriceCheck />
                <textarea
                  placeholder="Gold Plan Services"
                  defaultValue={
                    product.goldPlan ? product.goldPlan.addOns : null
                  }
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
                  defaultValue={
                    product.platinumPlan ? product.platinumPlan.price : null
                  }
                  onChange={(e) => setPlatinumPrice(e.target.value)}
                ></input>
              </div>
              <div>
                <PriceCheck />
                <textarea
                  placeholder="Platinum Plan Services"
                  defaultValue={
                    product.platinumPlan ? product.platinumPlan.addOns : null
                  }
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

            <button
              id="createProductBtn"
              type="submit"
              onClick={editSellerServices}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPhotographer;
