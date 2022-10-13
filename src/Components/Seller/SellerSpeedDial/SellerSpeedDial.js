import React, { useState } from "react";
import axios from "axios";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import TextsmsIcon from "@mui/icons-material/Textsms";
import LogoutIcon from "@mui/icons-material/Logout";
import img1 from "../../../images/img1.png";
import { useNavigate } from "react-router-dom";
const SellerSpeedDial = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");

      localStorage.removeItem("firstLogin");

      window.location.href = "/login";
    } catch (error) {
      window.location.href = "/";
    }
  };
  return (
    <div>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="Navigation speed dial"
        direction="down"
        sx={{ position: "fixed", top: 16, right: 16, borderRadius: "100%" }}
        icon={
          <img
            src={img1}
            alt="profile image"
            style={{ height: "60px", width: "60px" }}
          />
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <SpeedDialAction
          icon={<PersonIcon />}
          tooltipTitle="Profile"
          onClick={() => navigate("/seller/profile")}
        />
        <SpeedDialAction
          icon={<TextsmsIcon />}
          tooltipTitle="Chat"
          onClick={() => navigate("/sellerChat")}
        />
        <SpeedDialAction
          icon={<LogoutIcon />}
          tooltipTitle="Logout"
          onClick={handleLogout}
        />
      </SpeedDial>
    </div>
  );
};

export default SellerSpeedDial;
