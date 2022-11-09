import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { Button } from "@mui/material";
import "./addService.css";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
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
  Add,
  Article,
  Remove,
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
    console.log("values", formValues);
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
      basicPlan: formValues,
      goldPlan: venueValues,
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
  const [images, setImages] = useState("");
  const [file, setFile] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  //adding and removing fields for menus
  const [formValues, setFormValues] = useState([
    { basicPrice: 0, basicService: "" },
  ]);

  let addFormFields = () => {
    setFormValues([...formValues, { basicPrice: 0, basicService: "" }]);
  };

  console.log("basic", formValues.basicPrice);

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  //adding and removing fields for venues
  const [venueValues, setvenueValues] = useState([
    {
      venueName: "",
      VenueCapacity: 0,
      venueGoldPrice: 0,
      venueGoldService: "",
    },
  ]);

  let addVenueFormFields = () => {
    setvenueValues([
      ...venueValues,
      {
        venueName: "",
        VenueCapacity: 0,
        venueGoldPrice: 0,
        venueGoldService: "",
      },
    ]);
  };

  let removeVenueFormFields = (i) => {
    let newFormValues = [...venueValues];
    newFormValues.splice(i, 1);
    setvenueValues(newFormValues);
  };

  let handleChangeVenue = (i, e) => {
    let newFormValues = [...venueValues];
    newFormValues[i][e.target.name] = e.target.value;
    setvenueValues(newFormValues);
  };

  // adding and removing venue services

  // const [serviceAddons, setServiceAddons] = useState([
  //   { goldServiceName: "", goldServicePrice: null },
  // ]);

  // console.log("service addons", serviceAddons);
  // let addServiceFormFields = () => {
  //   setServiceAddons([
  //     ...serviceAddons,
  //     { goldServiceName: "", goldServicePrice: null },
  //   ]);
  // };

  // let removeServiceFormFields = (i) => {
  //   let newFormValues = [...serviceAddons];
  //   newFormValues.splice(i, 1);
  //   setServiceAddons(newFormValues);
  // };

  // let handleServiceChange = (i, e) => {
  //   console.log(e.target.name)
  //   let newFormValues = [...serviceAddons];
  //   newFormValues[i][e.target.name] = e.target.value;
  //   setServiceAddons(newFormValues);
  // };

  return (
    <div className="service">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="serviceglass">
        <Sidebar />
        <div className="newProductContainer" style={{ overflow: "scroll" }}>
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
          <div className="addMarquee row " style={{ overflow: "auto" }}>
            <div className="col-4">
              <div>
                {/* <Spellcheck /> */}
                {/* <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                /> */}

                <TextField
                  label="Name"
                  placeholder="Name"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
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
                  sx={{ m: 1, width: "25ch" }}
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
                  label="Phone No"
                  placeholder="Phone No"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
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
                  sx={{ m: 1, width: "25ch" }}
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
              <div>
                <TextField
                  label="Venue Type"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
                  value={venue}
                  placeholder="Venue Type"
                  onChange={(e) => setVenue(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <House />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="col-4">
              <div>
                <TextField
                  label="Ameneties"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
                  value={amenities}
                  placeholder="Ameneties"
                  onChange={(e) => setAmenities(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={ameneties}
                          style={{
                            height: "25px",
                            width: "25px",
                            fontWeight: "bold",
                            position: "absolute",
                            fontSize: "1.6vmax",
                          }}
                        />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Parking"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
                  value={parking}
                  placeholder="Parking"
                  onChange={(e) => setParking(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsCar />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <TextField
                  label="Catering"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "25ch" }}
                  value={catering}
                  placeholder="Catering"
                  onChange={(e) => setCatering(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Restaurant />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {formValues.map((index) => (
                <div className="form-inline" key={index}>
                  <TextField
                    className="input"
                    label="Menu Price"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch", background: "transparent" }}
                    onChange={(e) => handleChange(index, e)}
                    name="basicPrice"
                    placeholder="Menu Price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriceCheck />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    label="Menu Addons"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    onChange={(e) => handleChange(index, e)}
                    name="basicService"
                    placeholder=" Menu Add Ons"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Article />
                        </InputAdornment>
                      ),
                    }}
                  />

                  {index ? (
                    <button
                      type="button"
                      className="btn btn-icon btn-danger rounded-circle"
                      onClick={() => removeFormFields(index)}
                      style={{ marginRight: "90px" }}
                    >
                      <Remove />
                    </button>
                  ) : null}
                </div>
              ))}
              <div className="button-section">
                <button
                  className="btn btn-icon btn-primary add"
                  type="button"
                  onClick={() => addFormFields()}
                  style={{ marginTop: "-30px" }}
                >
                  <Add />
                  Add Menu
                </button>
              </div>
              {/* <div>
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
              </div> */}
            </div>
            <div className="col-4">
              {venueValues.map((index) => (
                <div className="form-inline" key={index}>
                  <TextField
                    label="Venue Name"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    onChange={(e) => handleChangeVenue(index, e)}
                    name="venueName"
                    placeholder="Venue Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriceCheck />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Venue Price"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    onChange={(e) => handleChangeVenue(index, e)}
                    name="venueGoldPrice"
                    placeholder="Venue Price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriceCheck />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Max Capacity"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    onChange={(e) => handleChangeVenue(index, e)}
                    name="venueCapacity"
                    placeholder="Max Capacity"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriceCheck />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Venue Service"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    onChange={(e) => handleChangeVenue(index, e)}
                    name="venueGoldService"
                    placeholder="Venue Service"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Article />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* {index ? (
                    <button
                      type="button"
                      className="btn btn-icon btn-danger rounded-circle"
                      onClick={() => removeServiceFormFields(index)}
                      style={{ marginRight: "90px" }}
                    >
                      <Remove />
                    </button>
                  ) : null} */}
                  {/*

                  <TextField
                    label="Service Price"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    onChange={(e) => handleChangeVenue(index, e)}
                    name="goldServicePrice"
                    placeholder="Service Price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriceCheck />
                        </InputAdornment>
                      ),
                    }}
                  /> */}
                  {/* {serviceAddons.map((index) => (
                    <div className="form-inline" key={index}>
                      <TextField
                        label="Venue Services"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "25ch" }}
                        onChange={(e) => handleServiceChange(index, e)}
                        name="goldServiceName"
                        placeholder="Venue Services"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Article />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        label="Service Price"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "25ch" }}
                        onChange={(e) => handleServiceChange(index, e)}
                        name="goldServicePrice"
                        placeholder="Service Price"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PriceCheck />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {index ? (
                        <button
                          type="button"
                          className="btn btn-icon btn-danger rounded-circle"
                          onClick={() => removeServiceFormFields(index)}
                          style={{ marginRight: "90px" }}
                        >
                          <Remove />
                        </button>
                      ) : null}
                    </div>
                  ))} */}
                  {/* <div className="button-section">
                    <button
                      className="btn btn-icon btn-primary add "
                      type="button"
                      onClick={() => addServiceFormFields()}
                      style={{ marginRight: "80px" }}
                    >
                      <Add />
                      Add Service
                    </button>
                  </div> */}

                  {/* <button
                    className="btn btn-icon btn-primary add rounded-circle"
                    type="button"
                    onClick={() => addVenueFormFields()}
                    style={{ marginRight: "80px" }}
                  >
                    <Add />
                  </button> */}
                  {index ? (
                    <button
                      type="button"
                      className="button remove"
                      onClick={() => removeVenueFormFields(index)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
              <div className="button-section">
                <button
                  className="btn btn-icon btn-primary add"
                  type="button"
                  onClick={() => addVenueFormFields()}
                >
                  <Add />
                  Add Venue
                </button>
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
                <button
                  id="createProductBtn"
                  type="submit"
                  onClick={addService}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
