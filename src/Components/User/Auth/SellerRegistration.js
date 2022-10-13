import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  password: "",
  cnic: "",
  phone: "",
  serviceType: "",
  err: "",
  success: "",
};

export default function SellerRegistration() {
  const navigate = useNavigate();
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [cnic, setCnic] = React.useState();
  const [phone, setPhone] = React.useState();
  const [serviceType, setServiceType] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/registerSeller", {
        name,
        email,
        password,
        cnic,
        phone,
        serviceType,
      });
      console.log(res);
      alert("Account has been created");
      navigate("/login");
    } catch (error) {}
  };
  return (
    <div className="container w-50 mt-5 bg-secondary p-5">
      <h2 className="text-center">Seller Registration</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter Name"
            id=""
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            id=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            CNIC
          </label>
          <input
            className="form-control"
            type="text"
            name="cnic"
            placeholder="Enter CNIC"
            id=""
            onChange={(e) => {
              setCnic(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Phone Number
          </label>
          <input
            className="form-control"
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            id=""
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Service Type
          </label>
          <input
            className="form-control"
            type="text"
            name="serviceType"
            placeholder="Enter Service Type"
            id=""
            onChange={(e) => {
              setServiceType(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter Password"
            id=""
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Confirm Password
          </label>
          <input
            className="form-control"
            type="password"
            name="name"
            placeholder="Confirm Password"
            id=""
          />
        </div>
        <div className="mb-3">
          <button type="Submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
