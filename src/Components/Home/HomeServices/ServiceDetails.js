import React, { useState } from "react";
import Navbar from "../Navbar";
import "./ServiceDetails.css";
import axios from "axios";
import { useSelector } from "react-redux";

import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Divider,
  createTheme,
  ThemeProvider,
  colors,
} from "@mui/material";
import Subscription from "./Subscription";
import ReviewCard from "./ReviewCard";
import {
  LocalPhoneOutlined,
  CloseOutlined,
  LocalPhone,
  AccountCircleOutlined,
  HouseOutlined,
  TimeToLeave,
  RestaurantOutlined,
  DescriptionOutlined,
} from "@mui/icons-material";
import marquee from "../../../images/marquee.png";
import star from "../../../images/star.png";
import UserSpeedDial from "../SpeedDial/UserSpeedDial";
const theme = createTheme({
  palette: {
    secondary: {
      main: colors.pink[500],
    },
  },
});

const ServiceDetails = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [phoneModal, setPhoneModal] = useState(false);
  const [msgModal, setMsgModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");

  const location = useLocation();

  const service = location.state;

  const auth = useSelector((state) => state.authReducer);
  const token = useSelector((state) => state.token);

  const { user, isLogged } = auth;

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const submitPhoneModalToggle = () => {
    phoneModal ? setPhoneModal(false) : setPhoneModal(true);
  };

  const submitMsgModalToggle = () => {
    msgModal ? setMsgModal(false) : setMsgModal(true);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const addreview = await axios.patch(`/service/review/${service._id}`, {
      rating,
      comment,
      user: user._id,
    });
    await axios.patch(`/service/rating/${service._id}`);
  };

  const handleSubmitMsg = async (e) => {
    e.preventDefault();
    const addMsg = await axios.post(
      `/chat/chat`,
      {
        chatName: service.name,
        userId: service.seller,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(addMsg);

    const res = await axios.post(
      "/chat/sendMessage",
      {
        content: message,
        chatId: addMsg.data._id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(res);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        {isLogged ? (
          <div>
            <UserSpeedDial />
          </div>
        ) : null}
        <div className="service">
          <div className="tabContainer">
            <button type="button" className="tabButton">
              Details
            </button>
            <button type="button" className="tabButton">
              Pricing
            </button>
            <button type="button" className="tabButton">
              Reviews
            </button>
          </div>
          <div
            className="serviceDetails"
            style={{
              height: "100%",
              width: "97%",
              borderRadius: "2rem",
              background: "rgba(255, 255, 255, 0.54)",
              overflow: "hidden",
              gridTemplateColumns: "40rem auto",
              gap: "10px",
              marginLeft: "20px",
              padding: "20px",
            }}
          >
            <div className="productImage">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  marginBottom: "10px",
                }}
              >
                <img
                  src={service.images}
                  alt="Product img"
                  style={{ height: "300px", width: "300px" }}
                />
              </div>
              <div className="imgContent">
                {/* Chat */}
                <div>
                  <button type="button" onClick={submitMsgModalToggle}>
                    Send Message
                  </button>
                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={msgModal}
                    onClose={submitMsgModalToggle}
                  >
                    <DialogTitle
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                      }}
                    >
                      Send Message
                      <CloseOutlined
                        sx={{
                          marginLeft: "130px",
                          marginTop: "-30px",
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={submitMsgModalToggle}
                      />
                    </DialogTitle>
                    <Divider />
                    <DialogContent
                      className="submitDialog"
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <div
                        className="phoneNoDetails"
                        style={{ marginBottom: "20px" }}
                      >
                        <AccountCircleOutlined />
                        <span
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            fontFamily: "Roboto",
                            marginLeft: "10px",
                          }}
                        >
                          {service.name}
                        </span>
                      </div>

                      <textarea
                        className="submitDialogTextArea"
                        placeholder="Message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{
                          border: "1px solid rgba(0, 0, 0, 0.082)",

                          outline: "none",
                          padding: "2rem",
                          font: "300 1rem ",
                        }}
                      ></textarea>
                    </DialogContent>
                    <DialogActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleSubmitMsg}
                        sx={{ bgColor: "secondary.main" }}
                      >
                        Send
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                {/* Chat Ended */}

                {/* Phone Modal */}
                <div className="phoneNo">
                  <button
                    type="button"
                    style={{
                      display: "flex",
                      width: "6vh",
                      height: "6vh",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "transparent",
                      marginLeft: "40px",
                      borderRadius: "50%",
                      marginTop: "22px",
                    }}
                    onClick={submitPhoneModalToggle}
                  >
                    <LocalPhoneOutlined
                      sx={{
                        color: "#d7385e",
                        cursor: "pointer",
                      }}
                      fontSize="large"
                    />
                  </button>

                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={phoneModal}
                    onClose={submitPhoneModalToggle}
                    sx={{
                      "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                          width: "100%",
                          maxWidth: "350px",
                        },
                      },
                    }}
                  >
                    <DialogTitle
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "25px",
                        fontFamily: "Roboto",
                      }}
                    >
                      Seller Details
                      <CloseOutlined
                        sx={{
                          marginLeft: "130px",
                          marginTop: "-30px",
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={submitPhoneModalToggle}
                      />
                    </DialogTitle>
                    <Divider />
                    <DialogContent
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <div className="phoneNoDetails">
                        <AccountCircleOutlined />
                        <span
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            fontFamily: "Roboto",
                            marginLeft: "10px",
                          }}
                        >
                          {service.name}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          margin: "20px 0",
                          padding: "15px 20px",
                          backgroundColor: "#A8A8A8",
                          borderRadius: "16px",
                        }}
                      >
                        <LocalPhone />
                        <div style={{ marginLeft: "10px" }}>
                          {service.phoneNo}
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions
                      sx={{ justifyContent: "space-between" }}
                    ></DialogActions>
                  </Dialog>
                </div>

                {/* Phone Modal Ended */}

                <div className="priceDetails">
                  <p>Price Range</p>
                  <span>
                    PKR {service.basicPlan.price} - PKR{" "}
                    {service.platinumPlan.price}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="serviceName">
                {service.name}
                <div className="serviceRating">
                  <img
                    src={star}
                    alt="Rating"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span>
                    {service.ratings.toFixed(2)} ({service.numOfReviews})
                  </span>
                </div>
              </div>
              {/* Service Details */}
              <div className="serviceDetailsContainer" id="details">
                <p>Details</p>
                <div className="serviceDetails">
                  <div className="venueType">
                    <HouseOutlined
                      style={{
                        color: "#d7385e",
                        height: "30px",
                        width: "30px",
                      }}
                      fontSize="medium"
                    />
                    <div className="venueTypeName">
                      <p>Venue Type</p>
                      <span>{service.venueType}</span>
                    </div>
                  </div>
                  <div className="venueType">
                    <img
                      src={marquee}
                      alt="marquee icon"
                      style={{
                        height: "25px",
                        width: "25px",
                        fontWeight: "bold",
                      }}
                    />

                    <div className="venueTypeName">
                      <p>Amenities</p>
                      <span>{service.amenities}</span>
                    </div>
                  </div>
                  <div className="venueType">
                    <TimeToLeave
                      style={{
                        color: "#d7385e",
                        height: "30px",
                        width: "30px",
                      }}
                      fontSize="medium"
                    />
                    <div className="venueTypeName">
                      <p>Parking Space</p>
                      <span>{service.parking}</span>
                    </div>
                  </div>
                  <div className="venueType">
                    <RestaurantOutlined
                      style={{
                        color: "#d7385e",
                        height: "30px",
                        width: "30px",
                      }}
                      fontSize="medium"
                    />
                    <div className="venueTypeName">
                      <p>Catering</p>
                      <span>{service.catering}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="serviceDescription"
                style={{ marginBottom: "20px" }}
              >
                <div
                  className="serviceDescriptionName"
                  style={{ display: "flex" }}
                >
                  <DescriptionOutlined
                    style={{
                      color: "#d7385e",
                      height: "30px",
                      width: "30px",
                      marginRight: "10px",
                      marginBottom: "20px",
                    }}
                  />
                  <p>Description</p>
                </div>
                {service.description}
              </div>

              {/* Review Card */}

              <Button
                color="success"
                variant="contained"
                onClick={submitReviewToggle}
              >
                Review
              </Button>

              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
                sx={{
                  "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                      width: "100%",
                      maxWidth: "300px",
                    },
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                  }}
                >
                  Service Review
                  <CloseOutlined
                    sx={{
                      marginTop: "-30px",
                      marginLeft: "90px",
                      cursor: "pointer",
                      color: "red",
                      fontWeight: "bold",
                    }}
                    onClick={submitReviewToggle}
                  />
                </DialogTitle>
                <Divider />
                <DialogContent
                  className="submitDialog"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    className="phoneNoDetails"
                    style={{ marginBottom: "20px" }}
                  >
                    <AccountCircleOutlined />
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        fontFamily: "Roboto",
                        marginLeft: "10px",
                      }}
                    >
                      {service.name}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "15px 20px",
                      backgroundColor: "#A8A8A8",
                      borderRadius: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        fontFamily: "Roboto",
                        marginBottom: "5px",
                      }}
                    >
                      Rating
                    </span>
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      sx={{ marginBottom: "15px" }}
                    />
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        fontFamily: "Roboto",
                        marginBottom: "5px",
                      }}
                    >
                      Review
                    </span>
                    <textarea
                      className="submitDialogTextArea"
                      cols="20"
                      rows="1"
                      placeholder="Review..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      sx={{
                        border: "1px solid rgba(0, 0, 0, 0.082)",
                        margin: "1vmax 0",
                        outline: "none",
                        padding: "2rem",
                        font: "300 1rem ",
                      }}
                    ></textarea>
                  </div>
                </DialogContent>
                <DialogActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    color="success"
                    variant="contained"
                    onClick={handleSubmitReview}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Review Card ended */}
            </div>
          </div>
        </div>

        <div className="subscription" id="pricing">
          <Subscription data={service} />
        </div>

        <div>
          <h3 className="reviewsHeading">Reviews</h3>
          {service.reviews && service.reviews[0] ? (
            <div className="reviews">
              {service.reviews &&
                service.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews"> No Reviews Yet!</p>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ServiceDetails;
