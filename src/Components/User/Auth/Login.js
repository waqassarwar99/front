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
import "./login.css";
import { useFormik } from "formik";

const initialState = {
  name: "",
  email: "",
  password: "",
  err: "",
  success: "",
};

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const onSubmit = (values) => {
  console.log("Form values", values);
  const res = axios.post("/user/login", {
    email: values.email,
    password: values.password,
  });
  const res1 = axios.get("/user/detail", {
    headers: { Authorization: res.data.token },
  });
  // setUser({ ...user, err: "", success: res.data.msg });
  localStorage.setItem("firstLogin", true);
  localStorage.setItem("name", res1.data.name);
  localStorage.setItem("email", res1.data.email);
  localStorage.setItem("avatar", res1.data.avatar);
  localStorage.setItem("role", res1.data.role);
  localStorage.setItem("token", res.data.token);
  // dispatch(dispatcLogin());

  // navigate("/");
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "*Required";
  }

  if (!values.email) {
    errors.email = "*Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.password) {
    errors.password = "*Required";
  }

  return errors;
};

export default function Login() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const navigate = useNavigate();

  const [user, setUser] = React.useState(initialState);
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const dispatch = useDispatch();
  const { name, email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      const res1 = await axios.get("/user/detail", {
        headers: { Authorization: res.data.token },
      });
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      localStorage.setItem("name", res1.data.name);
      localStorage.setItem("email", res1.data.email);
      localStorage.setItem("avatar", res1.data.avatar);
      localStorage.setItem("role", res1.data.role);
      localStorage.setItem("token", res.data.token);
      dispatch(dispatcLogin());

      navigate("/");
    } catch (error) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      setUser({ ...user, err: "", success: res.data.msg });
      removeClass();
    } catch (error) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
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
        <div className="form-container sign-up-container">
          <form action="" onSubmit={handleRegisterSubmit}>
            <h2 className="mt-1" style={{ fontFamily: "Roboto" }}>
              Create Account
            </h2>
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
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChangeInput}
            />
            {formik.errors.name ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChangeInput}
            />
            {formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            <input
              type={passwordVisible ? "password" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChangeInput}
            />
            {formik.errors.password ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            <button
              className="Loginbtn"
              type="submit"
              style={{ marginTop: 20 }}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form action="" onSubmit={handleSubmit}>
            <h1 style={{ fontFamily: "Roboto" }}>Sign In</h1>
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
            {formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            <input
              type={passwordVisible ? "password" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChangeInput}
            />
            {formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
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
            <p className="mt-3">
              <a href="/seller/login" style={{ textDecoration: "none" }}>
                Login as a Seller
              </a>
            </p>
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
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
