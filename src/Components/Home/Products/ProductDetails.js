import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Divider,
  Button,
} from "@mui/material";
import {
  LocalPhoneOutlined,
  CloseOutlined,
  LocalPhone,
  AccountCircleOutlined,
  DescriptionOutlined,
  PersonOutlineOutlined,
  Storage,
  ReviewsOutlined,
} from "@mui/icons-material";

import ReviewCard from "../HomeServices/ReviewCard";
import star from "../../../images/star.png";
import UserSpeedDial from "../SpeedDial/UserSpeedDial";
import { ADD_ITEM_TO_CART } from "../../../redux/actions/cartAction";

const ProductDetails = () => {
  const navigate = useNavigate();

  // Getting product data
  const location = useLocation();
  const product = location.state;

  //use states
  const [phoneModal, setPhoneModal] = useState(false);
  const [msgModal, setMsgModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  //Seller data

  // redux connection
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isLogged } = auth;

  const cart = useSelector((state) => state.cartReducer);
  const { items } = cart;

  // Modals

  const submitPhoneModalToggle = () => {
    phoneModal ? setPhoneModal(false) : setPhoneModal(true);
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const submitMsgModalToggle = () => {
    msgModal ? setMsgModal(false) : setMsgModal(true);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const addreview = await axios.patch(`/product/review/${product._id}`, {
      rating,
      comment,
      user: user._id,
    });
    await axios.patch(`/product/rating/${product._id}`);
  };

  const handleSubmitMsg = async (e) => {
    e.preventDefault();
    const addMsg = await axios.post(
      `/chat/chat`,
      {
        chatName: product.name,
        userId: product.seller,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

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
  };

  const addtocart = (item) => {
    const data = items.some(checkSeller);

    function checkSeller(seller) {
      return seller.product.seller._id === item.seller._id;
    }

    if (data || items.length === 0) {
      dispatch(ADD_ITEM_TO_CART(item));
    } else {
      alert("You can't add different seller products");
    }
  };

  return (
    <div>
      <Navbar />

      {isLogged ? (
        <div>
          <UserSpeedDial />
        </div>
      ) : null}
      <div className="Productss">
        <div
          className="ProductDetails"
          style={{
            display: "grid",
            height: "97%",
            width: "97%",
            borderRadius: "2rem",
            background: "#dcdcdc",
            overflow: "hidden",
            gridTemplateColumns: "40rem auto",
            marginLeft: "20px",
            marginTop: "20px",
            padding: "20px",
          }}
        >
          <div className="productImage">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <img
                src={product.images}
                alt="Product img"
                style={{
                  height: "300px",
                  width: "300px",
                }}
              />
            </div>
            <div className="imgContent">
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
                        {product.name}
                      </span>
                    </div>

                    <textarea
                      className="submitDialogTextArea"
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
                        maxWidth: "300px",
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
                        marginLeft: "80px",
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
                        {product.name}
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
                        {product.phoneNo}
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions
                    sx={{ justifyContent: "space-between" }}
                  ></DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
          {/* Product Details */}
          <div>
            <div className="serviceName">
              {product.name}
              <div className="serviceRating">
                <img
                  src={star}
                  alt="Rating"
                  style={{ width: "20px", height: "20px" }}
                />
                <span>
                  {product.ratings.toFixed(2)} ({product.numOfReviews})
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "150px" }}>
              <div className="venueType">
                <PersonOutlineOutlined
                  style={{
                    color: "#d7385e",
                    height: "30px",
                    width: "30px",
                  }}
                  fontSize="medium"
                />
                <div className="venueTypeName">
                  <p>Seller</p>
                  <span>{product.seller.name}</span>
                </div>
              </div>
              <div className="venueType">
                <Storage
                  style={{
                    color: "#d7385e",
                    height: "30px",
                    width: "30px",
                  }}
                  fontSize="medium"
                />
                <div className="venueTypeName">
                  <p>Stock</p>
                  <span>{product.stock}</span>
                </div>
              </div>
            </div>

            <div className="serviceDescription" style={{ marginTop: "20px" }}>
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
              {product.description}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginRight: "30px",
                }}
              >
                Price{" "}
              </span>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "800",
                  color: "#d7385e",
                }}
              >
                PKR {product.price}
              </span>
            </div>
            <Stack spacing={6} direction="row">
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                color="warning"
                size="medium"
                onClick={() => {
                  addtocart(product);
                  navigate("/cart");
                }}
              >
                Add To Cart
              </Button>

              <Button
                startIcon={<ReviewsOutlined />}
                color="success"
                variant="contained"
                onClick={submitReviewToggle}
                sx={{ marginTop: "20px" }}
              >
                Review
              </Button>
            </Stack>

            {/* Review Card */}

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
                Product Review
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
                    {product.name}
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
          </div>
        </div>
      </div>
      <div>
        <h3 className="reviewsHeading">Reviews</h3>
        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard review={review} key={review._id} />
              ))}
          </div>
        ) : (
          <p className="noReviews"> No Reviews Yet!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
