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
} from "@mui/icons-material";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";

const EditSaloon = () => {
  const navigate = useNavigate();
  const location1 = useLocation();
  const product = location1.state;

  const editSellerServices = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("/user/upload", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const editsellerservices = await axios.patch(
      `/service/editPhotographer/${product._id}`,
      {
        name: name ? name : product.name,
        description: description ? description : product.description,
        category: category ? category : product.category,
        location: location ? location : product.location,
        phoneNo: phoneNo ? phoneNo : product.phoneNo,
        images: res.data.url,
      }
    );
    console.log(editSellerServices);
    navigate("/saloon");
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
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
                <PriceCheck />
                <input
                  type="number"
                  placeholder="Basic Plan Price"
                  defaultValue={product.basicPlan.price}
                  onChange={(e) => setBasicPrice(e.target.value)}
                  cols="22"
                  rows="1"
                ></input>
              </div>

              <div>
                <PriceCheck />
                <textarea
                  placeholder="Basic Plan services"
                  defaultValue={product.basicPlan.addOns}
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
                  defaultValue={product.goldPlan.price}
                  onChange={(e) => setGoldPrice(e.target.value)}
                  cols="22"
                  rows="1"
                ></input>
              </div>
              <div>
                <PriceCheck />
                <textarea
                  placeholder="Gold Plan Services"
                  defaultValue={product.goldPlan.addOns}
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
                  defaultValue={product.platinumPlan.price}
                  onChange={(e) => setPlatinumPrice(e.target.value)}
                  cols="22"
                  rows="1"
                ></input>
              </div>
            </div>
            <div className="col-4">
              <div>
                <PriceCheck />
                <textarea
                  placeholder="Platinum Plan Services"
                  defaultValue={product.platinumPlan.addOns}
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

export default EditSaloon;
