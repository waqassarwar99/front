import React from "react";
import Navbar from "../Home/Navbar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhotographerCheckoutForm from "./PhotographerCheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Kr2oHDGZefk1hIJK2YnIJWbZS7dtRchmUl5sVyykPj64gbBBqTVfD8FF7LJpjUuSOJdEJS1nDO30RsDn3Tfa620000Jj2Kqq6"
);

const PhotographerPaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const price = location.state.totalPrice;

  const [clientSecret, setClientSecret] = React.useState("");

  const fetchClientSecret = async () => {
    const data = await axios.post("/payment/create", { amount: price });
    localStorage.removeItem("stripeToken");
    localStorage.setItem("stripeToken", data.data.clientSecret);
  };

  React.useEffect(() => {
    fetchClientSecret();
  }, []);

  const options = {
    clientSecret: localStorage.getItem("stripeToken"),
  };

  return (
    <>
      <Navbar />
      <div className=" mt-1" style={{ paddingLeft: 40, paddingTop: 10 }}>
        <Elements stripe={stripePromise} options={options}>
          <PhotographerCheckoutForm data={data} />
        </Elements>
      </div>
    </>
  );
};

export default PhotographerPaymentForm;
