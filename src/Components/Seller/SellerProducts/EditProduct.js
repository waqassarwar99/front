import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./AddProduct.css";
import { Button } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Phone from "@mui/icons-material/Phone";
import StorageIcon from "@mui/icons-material/Storage";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";
const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state;

  const editProduct = async (e) => {
    e.preventDefault();

    const editSellerProduct = await axios.patch(
      `/product/updateproduct/${product._id}`,
      {
        name: name ? name : product.name,
        description: description ? description : product.description,
        price: price ? price : product.price,
        phoneNo: number ? number : product.phoneNo,
        stock: stock ? stock : product.stock,
        category: category ? category : product.category,
        seller: product.seller,
      }
    );
    navigate("/sellerproducts");
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [number, setNumber] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  return (
    <div className="product">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="productglass" >
        <Sidebar />
        <div className="newProductContainer" style={{height:"90%"}}>
          <h1
            style={{
              color: "rgba(0, 0, 0, 0.733)",
              font: "400 3rem Roboto",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            Edit Product
          </h1>
          <div className="addMarquee row">
            <div className="col-6">
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  defaultValue={product.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  defaultValue={product.price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <DescriptionIcon />

                <textarea
                  placeholder="Product Description"
                  defaultValue={product.description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
            </div>
            <div className="col-6">
              <div>
                <AccountTreeIcon />
                <input
                  type="text"
                  placeholder="Category"
                  required
                  defaultValue={product.category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <Phone />
                <input
                  type="text"
                  placeholder="Phone No"
                  required
                  defaultValue={product.phoneNo}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div>
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  defaultValue={product.stock}
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
                marginTop: "-110px",
              }}
            >
              <input type="file" name="avatar" accept="image/*" multiple />
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
                onClick={editProduct}
                style={{
                  width: "25%",
                  marginTop: "-190px",
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
