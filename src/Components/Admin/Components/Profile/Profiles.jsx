import React, {useState} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  dispatchGetAllUser,
} from "../../../../redux/actions/usersAction";
import "./profiles.css";

export default function Profile() {
  const auth = useSelector((state) => state.authReducer);
  const token = useSelector((state) => state.token);

  const { user, isAdmin } = auth;
  const [avatar, setAvatar] = React.useState(false);
   const [name, setName] = useState("");
  
  const [callback, setCallBack] = React.useState(false);

  const submit = async () => {
    try {
      const res = await axios.patch("/user/update", {
        id: user._id,
        name,
      });
      alert("Profile Updated!");
    } catch (error) {}
  };

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUser(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  return (
    <div className="bg-light" style={{ height: "90vh" }}>
      <div className="container">
        <div className="row p-3">
          <div className="col-4 m-3 profilePicture">
            <div
              className="d-flex flex-column align-items-center justify-content-center position-relative"
              style={{ marginTop: 27 }}
            >
              <img
                className="rounded-circle picture"
                src={avatar ? avatar : user.avatar}
                style={{ width: 200, height: 200 }}
                alt=""
              />
              <h6 className="mt-3">{user.name}</h6>
              <p>{user.email}</p>
              <p>{user.cnic}</p>
              <h5 className="text-info mt-4 mb-3">About</h5>
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                corrupti nulla velit totam? Totam, dicta necessitatibus sapiente
                vitae earum saepe.
              </p>
            </div>
          </div>
          <div className="col-7 m-3 profileDetails">
            <h6 className="text-info mt-3 mb-3">Personal Details</h6>
            <div className="row">
              <div className="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
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
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="exampleFormControlInput1"
                    placeholder="Enter Email ID"
                    defaultValue={user.email}
                    disabled
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
  );
}