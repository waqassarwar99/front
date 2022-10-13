import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { fetchAllUsers, dispatchGetAllUser } from '../../../../../redux/actions/usersAction';

export default function EditProfile() {
  const auth = useSelector((state) => state.authReducer);
  const token = useSelector((state) => state.token);
  const { user, isAdmin } = auth;

  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [success, setSuccess] = React.useState();
  const [callback, setCallBack] = React.useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = React.useState(true);

  const closeAlert = () => {
    setShowSuccessAlert(false);
  };

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUser(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const updatePassword = async () => {
    try {
      const res = await axios.post(
        "/user/reset",
        {
          password,
        },
        {
          headers: { Authorization: token },
        }
      );
      setSuccess(res.data.msg);
    } catch (error) 
    {
      setError(error)
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F8F0E3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className=""
        style={{
          backgroundColor: "white",
          width: 350,
          height: "auto",
          marginTop: 80,
          paddingBottom: 70,
          paddingTop: 10,
        }}
      >
        
        {success && showSuccessAlert && (
          <Alert style = {{margin: 10}} onClose={closeAlert}>{success}</Alert>
        )}
        <h6 className="text-center p-3 border-bottom mb-3">Update Password</h6>
        <div
          className="border p-1"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
            marginTop: 40,
          }}
        >
          <KeyIcon />
          <input
            type="password"
            placeholder="Old Password"
            style={{ border: "none", marginLeft: 10, fontSize: 14 }}
          />
        </div>
        <div
          className="border p-1"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        >
          <LockOutlinedIcon />
          <input
            type="password"
            placeholder="Enter New Password"
            style={{ border: "none", marginLeft: 10, fontSize: 14 }}
          />
        </div>
        <div
          className="border p-1"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        >
          <LockIcon />
          <input
            type="password"
            placeholder="Confirm Password"
            style={{ border: "none", marginLeft: 10, fontSize: 14 }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button
          onClick={updatePassword}
          variant="outlined"
          style={{ marginLeft: 20, marginRight: 20, width: "87%" }}
        >
          Update Password
        </Button>
      </div>
    </div>
  );
}
