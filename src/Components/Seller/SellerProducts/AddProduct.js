import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { Button } from "@mui/material";
import {
  Phone,
  AccountTree,
  Description,
  Spellcheck,
  AttachMoney,
  Storage,
} from "@mui/icons-material";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";

const AddProduct = () => {
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

  const addProduct = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("/user/upload", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const addproduct = await axios.post("/product/addproduct", {
      name,
      description,
      category,
      price,
      stock,
      phoneNo: number,
      seller: userId,
      images: res.data.url,
    });
    navigate("/sellerproducts");
  };
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [avatar, setAvatar] = useState();
  const [file, setFile] = useState();
  const [images, setImages] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  return (
    <div className="product">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="productglass" style={{ overflow: "scroll" }}>
        <Sidebar />
        <div className="newProductContainer" style={{ overflow: "scroll" }}>
          <h1
            style={{
              color: "rgba(0, 0, 0, 0.733)",
              font: "400 3rem Roboto",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            Add Product
          </h1>

          <div className="addMarquee row">
            <div className="col-6">
              <div>
                <Spellcheck />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <AttachMoney />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <Description />

                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
            </div>
            <div className="col-6">
              <div>
                <AccountTree />
                <input
                  className="catergoryInput"
                  type="text"
                  placeholder="Category"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <Phone />
                <input
                  type="text"
                  placeholder="Phone No"
                  required
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div>
                <Storage />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>
            <div
              id="createProductFormFile"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                  width: "30%",
                  marginTop:"-110px"
                }}
              />
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                id="createProductBtn"
                type="submit"
                onClick={addProduct}
                style={{
                  width: "30%", 
                  marginTop:"-190px"
                }}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
