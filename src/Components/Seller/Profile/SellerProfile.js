import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";
import img1 from "../../../images/img1.png";

export default function SellerProfile() {
  //seller data
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token },
      });
      // setUserId(res.data._id);
      setName(res.data.name);
      setEmail(res.data.email);
      setCnic(res.data.cnic);
      setType(res.data.serviceType);
      setPhone(res.data.phone);
      setType(res.data.serviceType);
      setStatus(res.data.status);
      setId(res.data._id);
    };

    getData();
  }, []);

  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");

  const [avatar, setAvatar] = React.useState(false);
  const [callback, setCallBack] = React.useState(false);

  const submit = async () => {
    try {
      const res = await axios.patch("/user/updateSeller", {
        id,
        name,
        phone,
        type,
      });
      alert("Updated");
    } catch (error) {}
  };

  return (
    <div className="product">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="productglass">
        <Sidebar />
        <div className="container">
          <div className="row p-3">
            <div className="col-4 m-3 profilePicture">
              <div
                className="d-flex flex-column align-items-center justify-content-center position-relative"
                style={{ marginTop: 27 }}
              >
                <img
                  className="rounded-circle picture"
                  // src={avatar ? avatar : user.avatar}
                  src={img1}
                  style={{ width: 200, height: 200 }}
                  alt="avatar"
                />
                <h6 className="mt-3">{name}</h6>
                <p>{email}</p>
                <p>{cnic}</p>
                <h5 className="text-info mt-4 mb-3">About</h5>
                <p className="text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem corrupti nulla velit totam? Totam, dicta necessitatibus
                  sapiente vitae earum saepe.
                </p>
              </div>
            </div>
            <div className="col-7 m-3 profileDetails">
              <h6 className="text-info mt-3 mb-3">Personal Details</h6>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="exampleFormControlInput1"
                      placeholder="Enter First Name"
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="exampleFormControlInput1"
                      placeholder="Enter Email ID"
                      defaultValue={email}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Cnic</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Phone Number"
                      disabled
                      value={cnic}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Service Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Service Type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Phone Number"
                      disabled
                      value={status}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button className="btn btn-primary" onClick={submit}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
