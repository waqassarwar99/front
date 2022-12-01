import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserSpeedDial from "../SpeedDial/UserSpeedDial";
import { Edit } from "@mui/icons-material";
import Navbar from "../Navbar";
export default function ClientProfile() {
  //user data
  const auth = useSelector((state) => state.authReducer);
  const token = useSelector((state) => state.token);

  const { user, isLogged } = auth;
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState(null);
  const [about, setAbout] = useState("");
  const [id, setId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [callback, setCallBack] = useState(false);
  const [password, setPassword] = useState("");
  const [cpass, setCPass] = useState("");

  // User profile update
  const submit = async () => {
    try {
      const res = await axios.patch("/user/update", {
        id: user._id,
        name: name ? name : user.name,
        phoneNo: phoneNo ? phoneNo : user.phoneNo,
        about: about ? about : user.about,
        avatar: avatar ? avatar : user.avatar,
      });
      alert("Profile Updated!");
      window.location.href = "/userProfile";
    } catch (error) {}
  };

  // User password update

  const updatePassword = async () => {
    if (password !== cpass) {
      alert("Password does not match");
    } else {
      try {
        const res = await axios.post("/user/resetpassword", {
          id: user._id,
          password,
        });
        alert("Password Updated!");
        window.location.href = "/";
      } catch (error) {}
    }
  };

  // change Avatar

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file)  alert("No Files were Uploaded");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
         alert("File format is incorrect");

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
    <div>
      <Navbar />
      {isLogged ? (
        <div>
          <UserSpeedDial />
        </div>
      ) : null}

      <div
        className="row p-3 "
        style={{
          width: "98%",
          height: "620px",
          background: "	#E8E8E8",
          borderRadius: "8px",
          marginLeft: "20px",
          marginTop: "10px",
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Dancing Script",
            fontWeight: "700",
            fontSize: "45px",
          }}
        >
          Update Profile
        </h2>
        <div
          className="col-3 m-3 profilePicture"
          style={{ maxHeight: "500px" }}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center position-relative"
            style={{ marginTop: 27 }}
          >
            <img
              className="rounded-circle picture"
              src={avatar ? avatar : user.avatar}
              style={{ width: 200, height: 200 }}
              alt="avatar"
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
            <h6 className="mt-3">{user.name}</h6>
            <p>{user.email}</p>
            <h5 className="text-info mt-4 mb-3">About</h5>
            <textarea
              className="form-control"
              name="about"
              id="exampleFormControlInput1"
              placeholder="Write something about yourself..."
              maxLength={150}
              cols="60"
              rows="3"
              defaultValue={user.about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>
        <div
          className="col-4 m-3 profileDetails"
          style={{ maxHeight: "500px" }}
        >
          <h6 className="text-info mt-3 mb-3">Personal Details</h6>
          <div className="row">
            <div className="col-12">
              <div className="mb-4">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="exampleFormControlInput1"
                  placeholder="Enter First Name"
                  defaultValue={user.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="mb-4">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNo"
                  id="exampleFormControlInput1"
                  placeholder="Enter phone number"
                  defaultValue={user.phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
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
                  defaultValue={user.email}
                  disabled
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "110px",
            }}
          >
            <button
              className="btn btn-success"
              onClick={submit}
              disabled={loading}
            >
              <Edit />
              Edit
            </button>
          </div>
        </div>
        <div
          className="col-4 m-3 profileDetails"
          style={{ maxHeight: "500px" }}
        >
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
  );
}
