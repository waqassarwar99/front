import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { Button } from "@mui/material";
import "./addService.css";
import { useSelector } from "react-redux";
import {
  AccountTree,
  Description,
  Spellcheck,
  AttachMoney,
  LocationOn,
  Phone,
  House,
  DirectionsCar,
  Restaurant,
  PriceCheck,
} from "@mui/icons-material";
import ameneties from "../../../images/ameneties.png";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";

const AddService = () => {
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

    const addservice = await axios.post("/service/addmarquee", {
      name,

      description,
      location,
      phoneNo,
      seller: userId,
      images: res.data.url,
      venueType: venue,
      amenities,
      parking,
      catering,
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
    navigate("/marquees");
  };
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNo, setNumber] = useState("");
  const [venue, setVenue] = useState("");
  const [amenities, setAmenities] = useState("");
  const [parking, setParking] = useState("");
  const [catering, setCatering] = useState("");
  const [basicPrice, setBasicPrice] = useState("");
  const [basicService, setBasicService] = useState("");
  const [goldPrice, setGoldPrice] = useState("");
  const [goldService, setGoldService] = useState("");
  const [platinumPrice, setPlatinumPrice] = useState("");
  const [platinumService, setPlatinumService] = useState("");
  const [images, setImages] = useState("");
  const [file, setFile] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  return (
    <div className="service">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="serviceglass">
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
            Add Marquee
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
              <div>
                <House />
                <input
                  type="string"
                  placeholder="Venue Type"
                  value={venue}
                  required
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>
            </div>
            <div className="col-4">
              <div>
                <img
                  src={ameneties}
                  alt="marquee icon"
                  style={{
                    height: "20px",
                    width: "20px",
                    fontWeight: "bold",
                    position: "absolute",
                    transform: "translateY(1vmax)",
                    fontSize: "1.6vmax",
                    maginTop: "10px",
                    marginLeft: "15px",
                  }}
                />
                <input
                  type="string"
                  placeholder="Ameneties"
                  value={amenities}
                  required
                  onChange={(e) => setAmenities(e.target.value)}
                />
              </div>
              <div>
                <DirectionsCar />
                <input
                  type="string"
                  placeholder="Parking"
                  value={parking}
                  required
                  onChange={(e) => setParking(e.target.value)}
                />
              </div>

              <div>
                <Restaurant />
                <input
                  type="string"
                  placeholder="catering"
                  value={catering}
                  required
                  onChange={(e) => setCatering(e.target.value)}
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
            </div>
            <div className="col-4">
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

          {/* <form
            className="createProductForm"
            encType="multipart/form-data"
            style={{ overflow: "scroll" }}
          >
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
              <AttachMoney />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <Description />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTree />
              <input
                type="text"
                placeholder="Category"
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <FontAwesomeIcon icon="fa-solid fa-chess-king" />
              <input
                type="text"
                placeholder="Experties"
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Cancellation Policy"
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
              <LocationOn />
              <input
                type="string"
                placeholder="Location"
                required
                onChange={(e) => setLocation(e.target.value)}
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
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button id="createProductBtn" type="submit" onClick={addService}>
              Create
            </Button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default AddService;
