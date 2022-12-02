import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import arch from "../../images/arch.png";
import camera from "../../images/camera.png";
import makeup from "../../images/makeup.png";
import crown from "../../images/crown.png";
// import crown from "../../images/crown (1).png";

import { styled, alpha } from "@mui/material/styles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function Navbar() {
  const navigate = useNavigate();

  // redux
  const auth = useSelector((state) => state.authReducer);
  const { user, isLogged } = auth;
  const [notification, setNotification] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (props) => {
    navigate(`/${props}`);
    setAnchorEl(null);
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light p-0 m-0"
        style={{ backgroundColor: "#EECC9A", maxWidth: "100%" }}
      >
        <div className="container-fluid">
          <img src={crown} alt="logo" height={35} width={35} />
          <span
            style={{
              fontSize: "30px",
              fontFamily: "Roboto",
              fontWeight: "600",
              marginLeft: "5px",
            }}
          >
            EE
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            style={{
              display: "flex",
              marginLeft: "30px",
            }}
          >
            <ul className="navbar-nav">
              <li
                className="nav-item"
                onClick={() => navigate("/")}
                style={{ marginRight: "30px", cursor: "pointer" }}
              >
                <a className="nav-link" aria-current="page">
                  Home
                </a>
              </li>

              <li
                className="nav-item"
                onClick={() => navigate("/products")}
                style={{ marginRight: "30px", cursor: "pointer" }}
              >
                <a className="nav-link">Products</a>
              </li>

              <li
                className="nav-item"
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                disableelevation="true"
                onClick={handleClick}
                style={{ marginRight: "30px", cursor: "pointer" }}
              >
                <a className="nav-link">
                  Services <KeyboardArrowDownIcon />
                </a>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => handleClose("services")}
                    disableRipple
                  >
                    <img
                      src={arch}
                      width={22}
                      height={22}
                      style={{ marginRight: "10px" }}
                    />
                    Marquee
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem
                    onClick={() => handleClose("photographers")}
                    disableRipple
                  >
                    <img
                      src={camera}
                      width={22}
                      height={22}
                      style={{ marginRight: "10px" }}
                    />
                    Photographer
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem
                    onClick={() => handleClose("saloons")}
                    disableRipple
                  >
                    <img
                      src={makeup}
                      width={22}
                      height={22}
                      style={{ marginRight: "10px" }}
                    />
                    Saloon
                  </MenuItem>
                </StyledMenu>
              </li>

             
              <li
                className="nav-item"
                onClick={() => navigate("/about")}
                style={{ marginRight: "30px", cursor: "pointer" }}
              >
                <a className="nav-link">About Us</a>
              </li>
              <li className="nav-item" style={{ cursor: "pointer" }}>
                <a className="nav-link" onClick={() => navigate("/contact")}>
                  Contact
                </a>
              </li>
              <li
                className="nav-item"
                style={{
                  cursor: "pointer",
                  marginLeft: "20px",
                }}
              >
                <a className="nav-link" onClick={() => navigate("/login")}>
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
