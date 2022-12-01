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
    // console.log("values", formValues);
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
      basicPlan: inputList,
      goldPlan: venueList,
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
  const [inputList, setinputList] = React.useState([
    { basicPrice: "", basicService: "" },
  ]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
    console.log(inputList);
  };

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { basicPrice: "", basicService: "" }]);
  };

  //adding and removing fields for venues

  const [addonsList, setAddonsList] = useState([
    { addOns: "", addOnsPrice: "" },
  ]);

  const handleVenueAddoninputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...addonsList];
    list[index][name] = value;
    setAddonsList(list);
    console.log("Addons: ", addonsList);
  };

  const handleVenueAddonremove = (index) => {
    const list = [...addonsList];
    list.splice(index, 1);
    setAddonsList(list);
  };

  const handleVenueAddonaddclick = () => {
    setAddonsList([...addonsList, { addOns: "", addOnsPrice: "" }]);
  };

  const [venueList, setVenueList] = useState([
    { venueName: "", maxCapacity: "", addonsList },
  ]);

  const handleVenueinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...venueList];
    const addons = [...addonsList];
    console.log("SSSS: ", addonsList);

    list[index][name] = value;
    list[index]["addonsList"] = addons;
    setVenueList(list);
    console.log("Venue: ", venueList);
  };

  const handleVenueremove = (index) => {
    const list = [...venueList];
    list.splice(index, 1);
    setVenueList(list);
  };

  const handleVenueaddclick = () => {
    setVenueList([
      ...venueList,
      { venueName: "", maxCapacity: "", addonsList },
    ]);
  };

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
              <div>
                <TextField
                  label="Venue Type"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
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
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
                <button
                  id="createProductBtn"
                  type="submit"
                  onClick={addService}
                  style={{width:"57%",marginLeft:"10px"}}
                >
                  Create
                </button>
              </div>
            </div>
            <div className="col-4">
              <div>
                <TextField
                  label="Ameneties"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "30ch" }}
                  value={amenities}
                  placeholder="Ameneties"
                  onChange={(e) => setAmenities(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={ameneties}
                          style={{
                            height: "21px",
                            width: "21px",
                            
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
                  sx={{ m: 1, width: "30ch" }}
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
                  sx={{ m: 1, width: "30ch" }}
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

              {inputList.map((x, i) => {
                return (
                  <div>
                    <div className="form-group ">
                      <TextField
                        className="input"
                        label="Menu Price"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "30ch", background: "transparent" }}
                        name="basicPrice"
                        placeholder="Menu Price"
                        onChange={(e) => handleinputchange(e, i)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PriceCheck />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div class="form-group ">
                      <TextField
                        label="Menu Addons"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "30ch" }}
                        name="basicService"
                        placeholder=" Menu Add Ons"
                        onChange={(e) => handleinputchange(e, i)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Article />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>

                    <div className="form-group col-md-2 mt-4">
                      {inputList.length !== 1 && (
                        <button
                          className="btn btn-danger mx-1"
                          onClick={() => handleremove(i)}
                        >
                          Remove
                        </button>
                      )}
                      {inputList.length - 1 === i && (
                        <button
                          className="btn btn-success"
                          style={{ marginTop: 20, width: "160px", marginLeft:"10px" }}
                          onClick={handleaddclick}
                        >
                          <Add
                            sx={{ marginRight: "5px", marginBottom: "3px" }}
                          />
                          Add Menu
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-4">
              {venueList.map((x, i) => {
                return (
                  <div>
                    <div className="form-group ">
                      <TextField
                        className="input"
                        label="Venue Name"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "30ch", background: "transparent" }}
                        name="venueName"
                        placeholder="Venue Name"
                        onChange={(e) => handleVenueinputchange(e, i)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Spellcheck />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div class="form-group ">
                      <TextField
                        label="Venue Capacity"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: "30ch" }}
                        name="maxCapacity"
                        placeholder="Venue Capacity"
                        onChange={(e) => handleVenueinputchange(e, i)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Article />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    {addonsList.map((x, i) => {
                      return (
                        <div style={{ maginTop: "20px" }}>
                          <div className="form-group ">
                            <TextField
                              className="input"
                              label="Addons"
                              id="outlined-start-adornment"
                              sx={{
                                m: 1,
                                width: "30ch",
                                background: "transparent",
                              }}
                              name="addOns"
                              placeholder="Addons"
                              onChange={(e) =>
                                handleVenueAddoninputchange(e, i)
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PriceCheck />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                          <div class="form-group ">
                            <TextField
                              label="Addons Price"
                              id="outlined-start-adornment"
                              sx={{ m: 1, width: "30ch" }}
                              name="addOnsPrice"
                              placeholder="Addons Price"
                              onChange={(e) =>
                                handleVenueAddoninputchange(e, i)
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Article />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>

                          <div className="form-group col-md-2 mt-4">
                            {addonsList.length !== 1 && (
                              <button
                                className="btn btn-danger mx-1"
                                onClick={() => handleVenueAddonremove(i)}
                                style={{ marginBottom: 20 }}
                              >
                                Remove
                              </button>
                            )}
                            {addonsList.length - 1 === i && (
                              <button
                                className="btn btn-success"
                                style={{ marginTop: 20, width: "180px", marginLeft:"20px" }}
                                onClick={handleVenueAddonaddclick}
                              >
                                <Add
                                  sx={{
                                    marginRight: "5px",
                                    marginBottom: "3px",
                                  }}
                                />
                                Add Service
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div className="form-group col-md-2 mt-4">
                      {venueList.length !== 1 && (
                        <button
                          className="btn btn-danger mx-1"
                          onClick={() => handleVenueremove(i)}
                        >
                          Remove
                        </button>
                      )}
                      {venueList.length - 1 === i && (
                        <button
                          className="btn btn-success"
                          style={{ marginTop: 20, width: "160px", marginLeft:"20px" }}
                          onClick={handleVenueaddclick}
                        >
                          <Add
                            sx={{ marginRight: "5px", marginBottom: "3px" }}
                          />
                          Add Venue
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
