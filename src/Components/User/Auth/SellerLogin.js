import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notifications/Notifications";
import { dispatcLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./login.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  err: "",
  success: "",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const navigate = useNavigate();

  // snack bar
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // states
  const [user, setUser] = React.useState(initialState);
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const dispatch = useDispatch();
  const { name, email, password, err, success } = user;

  const [cnic, setCnic] = React.useState();
  const [phone, setPhone] = React.useState();
  const [serviceType, setServiceType] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/sellerLogin", { email, password });
      setErrorMsg(res.data.msg);
      if (res.data.msg == "Login Successfull!") {
        const res1 = await axios.get("/user/sellerdetail", {
          headers: { Authorization: res.data.token },
        });
        setUser({ ...user, err: "", success: res.data.msg });
        localStorage.setItem("firstLogin", true);
        localStorage.setItem("name", res1.data.name);
        localStorage.setItem("id", res1.data._id);
        localStorage.setItem("email", res1.data.email);
        localStorage.setItem("avatar", res1.data.avatar);
        localStorage.setItem("role", res1.data.role);
        localStorage.setItem("token", res.data.token);
        dispatch(dispatcLogin());

        navigate("/dashboard");
      } else {
        handleClick();
      }
    } catch (error) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const handleRegisterSubmit = async (e) => {
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
      alert("Request has been sent to the admin!");
      window.location.href = "/seller/login";
    } catch (error) {}
  };

  const [login, setLogin] = React.useState(false);

  const addClass = () => {
    setLogin(true);
  };

  const removeClass = () => {
    setLogin(false);
  };
  return (
    <div className="bodyss">
      <div
        className={
          login ? "loginContainer right-panel-active" : "loginContainer"
        }
        id="container"
      >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMsg}
          </Alert>
        </Snackbar>
        <div className="form-container sign-up-container">
          <form action="" onSubmit={handleRegisterSubmit}>
            <h3 className="mt-2" style={{ fontFamily: "Roboto" }}>
              Create Seller Account
            </h3>
            <div className="social-container">
              <a href="">
                <FacebookOutlinedIcon />
              </a>
              <a href="">
                <InstagramIcon />
              </a>
              <a href="">
                <TwitterIcon />
              </a>
            </div>
            <span className="span">or Use your Email for Registration</span>
            <div className="scroll" style={{ overflowY: "scroll" }}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChangeInput}
              />

              <input
                type="text"
                name="cnic"
                placeholder="Enter CNIC"
                id=""
                onChange={(e) => {
                  setCnic(e.target.value);
                }}
              />
              <input
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                id=""
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <input
                type="text"
                name="serviceType"
                placeholder="Enter Service Type"
                id=""
                onChange={(e) => {
                  setServiceType(e.target.value);
                }}
              />
              <input
                type={passwordVisible ? "password" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChangeInput}
              />
              <input
                type="password"
                name="name"
                placeholder="Confirm Password"
                id=""
              />
            </div>

            <button
              className="Loginbtn"
              type="submit"
              style={{ marginBottom: 10 }}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form action="" onSubmit={handleSubmit}>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <h1 style={{ fontFamily: "Roboto" }}>Seller Sign In</h1>
            <div className="social-container">
              <a href="">
                <FacebookOutlinedIcon />
              </a>
              <a href="">
                <InstagramIcon />
              </a>
              <a href="">
                <TwitterIcon />
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChangeInput}
            />
            <input
              type={passwordVisible ? "password" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChangeInput}
            />
            <Link
              to="/forgotPassword"
              className="border-bottom"
              style={{ textDecoration: "none", color: "black" }}
            >
              Forgot Password?
            </Link>
            <button className="Loginbtn" type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlayss">
            <div className="overlay-panel overlay-left">
              <h3>Welcome back!</h3>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: 3,
                  color: "black",
                  border: "none",
                }}
                id="signIn"
                onClick={removeClass}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h3>New Here?</h3>
              <p>Signup and discover a great amount of new opportunities.</p>
              <button
                className="ghost"
                style={{
                  padding: 10,
                  borderRadius: 3,
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                }}
                id="signUp"
                onClick={addClass}
              >
                Become a Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
