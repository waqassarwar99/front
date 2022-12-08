import { useState } from "react";
import UserSpeedDial from "../Home/SpeedDial/UserSpeedDial";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcStripe,
  faCcAmazonPay,
  faCcMastercard,
} from "@fortawesome/fontawesome-free-brands";

import { useSelector } from "react-redux";

export default function ProductCheckoutForm(props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");


  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const stripe = useStripe();
  const elements = useElements();

  const auth = useSelector((state) => state.authReducer);

  const { user, isLogged } = auth;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const addorder = await axios.post("/order/addOrder", {
      orderItems: props.data.orderItems,
      shippingInfo: { name, city, address, phoneNo },
      user: user._id,
      totalPrice: props.data.totalPrice 
    });

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/confirmPayment",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      alert("Payment Successful");
    }
  };
  return (
    <div
      style={{
        width: "98%",
        height: "580px",
        background: "	#E8E8E8",
        borderRadius: "8px",
        marginTop:"20px"
      }}
    >
      {isLogged ? (
        <div>
          <UserSpeedDial />
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="row" >
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Roboto",
              marginTop: "20px",
            }}
          >
            CheckOut
          </h1>
          <div
            className="row mt-5 mb-5 "
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <div className="col-5">
              <h6 className="mb-3 border-bottom pb-3">Personal Details</h6>
              <div className="row">
                <div className="col-12 mb-4">
                  <input
                    className="border"
                    style={{
                      padding: 10,
                      borderRadius: 50,
                      marginBottom: 15,
                      width: "100%",
                    }}
                    type="text"
                    name=""
                    id=""
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 mb-4">
                  <input
                    className="border"
                    style={{
                      padding: 10,
                      borderRadius: 50,
                      marginBottom: 15,
                      width: "100%",
                    }}
                    type="text"
                    name=""
                    id=""
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 mb-4">
                  <input
                    className="border"
                    style={{
                      padding: 10,
                      borderRadius: 50,
                      marginBottom: 15,
                      width: "100%",
                    }}
                    type="text"
                    name=""
                    id=""
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <input
                    className="border"
                    style={{
                      padding: 10,
                      borderRadius: 50,
                      marginBottom: 20,
                      width: "100%",
                    }}
                    type="text"
                    name=""
                    id=""
                    placeholder="Phone Number"
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-6" style={{ paddingLeft: 150 }}>
              <h6 className="mb-3 border-bottom pb-3">Payment Details</h6>
              <PaymentElement className="w-100 mb-3" />
              <h6>We accept the following Cards</h6>
              <FontAwesomeIcon
                icon={faCcVisa}
                style={{ fontSize: 36, marginRight: 10, color: "#1A1F71" }}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faCcStripe}
                style={{ fontSize: 36, marginRight: 10, color: "#EB001B" }}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faCcAmazonPay}
                style={{ fontSize: 36, marginRight: 10, color: "#f79c34" }}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faCcMastercard}
                style={{ fontSize: 36, marginRight: 10, color: "#EB001B" }}
              ></FontAwesomeIcon>
              <button
                className=""
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 20,
                  backgroundColor: "chocolate",
                  padding: 10,
                  borderRadius: 10,
                }}
                disabled={!stripe}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
