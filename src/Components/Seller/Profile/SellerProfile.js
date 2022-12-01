import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import SellerSpeedDial from "../SellerSpeedDial/SellerSpeedDial";
import img1 from "../../../images/img1.png";
import { Edit } from "@mui/icons-material";

export default function SellerProfile() {
  //seller data
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token },
      });
      setName(res.data.name);
      setEmail(res.data.email);
      setCnic(res.data.cnic);
      setType(res.data.serviceType);
      setPhone(res.data.phone);
      setType(res.data.serviceType);
      setStatus(res.data.status);
      setId(res.data._id);
      setImage(res.data.image);
      setAbout(res.data.about);
    };

    getData();
  }, []);

  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCPass] = useState("");

  const [avatar, setAvatar] = React.useState("");
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [callback, setCallBack] = React.useState(false);

  const submit = async () => {
    try {
      const res = await axios.patch("/user/updateSeller", {
        id,
        name,
        phone,
        type,
        about,
        image: avatar,
      });
      alert("Profile Updated!");
      window.location.href = "/seller/profile";
    } catch (error) {}
  };

  const updatePassword = async () => {
    try {
      const res = await axios.post("/user/sellerResetpassword", {
        id,
        password,
      });
      alert("Password Updated!");
    } catch (error) {}
  };

  // change Avatar

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("No Files were Uploaded");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/user/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className="product">
      <div>
        <SellerSpeedDial />
      </div>
      <div className="productglass">
        <Sidebar />
        <div className="container" style={{ marginTop: "30px" }}>
          <h1
            style={{
              display: "flex",
              fontFamily: "Dancing Script",
              fontWeight: "700",
              fontSize: "40px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Update Profile
          </h1>
          <div className="row p-3">
            <div className="col-3 m-3 profilePicture">
              <div
                className="d-flex flex-column align-items-center justify-content-center position-relative"
                style={{ marginTop: 27 }}
              >
                <img
                  className="picture"
                  src={image ? image : avatar}
                  style={{ width: 200, height: 200, borderRadius: 100 }}
                  alt="seller Image"
                />
                <label className="custom-file-upload">
                  <input
                    type="file"
                    name="file"
                    id="file_upload"
                    onChange={changeAvatar}
                  />
                  <Edit />
                </label>
                <h6 className="mt-3">{name}</h6>
                <p>{email}</p>
                <p>{cnic}</p>
                <h5 className="text-info mt-4 mb-3">About</h5>
                <textarea
                  className="form-control"
                  name="about"
                  id="exampleFormControlInput1"
                  placeholder="Write something about yourself..."
                  maxLength={150}
                  cols="60"
                  rows="5"
                  defaultValue={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
            </div>
            <div className="col-4 m-3 profileDetails">
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={submit}
                  disabled={loading}
                >
                  <Edit sx={{ marginRight: "5px" }} />
                  Edit
                </button>
              </div>
            </div>
            <div className="col-4 m-3 profileDetails">
              <h6 className="text-info mt-3 mb-3">Update Password</h6>
              <div className="row">
                <div className="col-12">
                  <div className="mb-4">
                    <label className="form-label">Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="oldPassword"
                      id="exampleFormControlInput1"
                      placeholder="Enter Old Password"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-4">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="newpassword"
                      id="exampleFormControlInput1"
                      placeholder="Enter New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="newpassword"
                      id="exampleFormControlInput1"
                      placeholder="Confirm Password"
                      value={cpass}
                      onChange={(e) => setCPass(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "100px",
                }}
              >
                <button className="btn btn-success " onClick={updatePassword}>
                  <Edit sx={{ marginRight: "5px" }} />
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
