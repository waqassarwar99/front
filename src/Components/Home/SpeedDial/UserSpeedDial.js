import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { SpeedDial, SpeedDialAction, Backdrop, Badge } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import TextsmsIcon from "@mui/icons-material/Textsms";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import img1 from "../../../images/img1.png";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import MainChat from "../../Chat/MainChat";

const UserSpeedDial = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const auth = useSelector((state) => state.authReducer);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  const { user } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");

      localStorage.removeItem("firstLogin");

      window.location.href = "/login";
    } catch (error) {
      window.location.href = "/";
    }
  };

  const [msgModal, setMsgModal] = useState(false);

  const handleSubmitMsg = async () => {
    try {
      await axios.post("/user/complain", { msg: message, user: user._id });
      alert("Complain has been sent to the admin");
    } catch (error) {
      console.log(error);
    }
  };
  const submitMsgModalToggle = () => {
    msgModal ? setMsgModal(false) : setMsgModal(true);
  };
  return (
    <>
      <div>
        <Backdrop open={open} style={{ zIndex: "10" }} />
        <SpeedDial
          ariaLabel="Navigation speed dial"
          direction="down"
          sx={{ position: "fixed", top: 6, right: 16, borderRadius: "100%" }}
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
            onClick={() => navigate("/userProfile")}
          />
          <SpeedDialAction
            icon={<TextsmsIcon />}
            tooltipTitle="Chat"
            onClick={() => navigate("/userchat")}
          />
          <SpeedDialAction
            icon={<ShoppingCartIcon />}
            tooltipTitle="Cart"
            onClick={() => navigate("/cart")}
          />
          <SpeedDialAction
            icon={<DescriptionIcon />}
            tooltipTitle="Complain"
            onClick={submitMsgModalToggle}
          />
          <SpeedDialAction
            icon={<LogoutIcon />}
            tooltipTitle="Logout"
            onClick={handleLogout}
          />
        </SpeedDial>
      </div>

      {/* Complaint Modal */}
      <div>
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={msgModal}
          onClose={submitMsgModalToggle}
        >
          <DialogTitle
            sx={{
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          >
            Complain
            <CloseOutlined
              sx={{
                marginLeft: "130px",
                marginTop: "-30px",
                cursor: "pointer",
                color: "red",
              }}
              onClick={submitMsgModalToggle}
            />
          </DialogTitle>
          <Divider />
          <DialogContent
            className="submitDialog"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <input
              type="text"
              placeholder="Name"
              style={{
                // outline: "none",
                padding: "10px",
                font: "300 1rem ",
              }}
            />
            <input
              type="text"
              placeholder="Email"
              style={{
                outline: "none",
                padding: "10px",
                font: "300 1rem ",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            />
            <textarea
              className="submitDialogTextArea"
              value={message}
              placeholder="Complain"
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                outline: "none",
                padding: "2rem",
                font: "300 1rem ",
              }}
            ></textarea>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmitMsg}
              sx={{ bgColor: "secondary.main" }}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default UserSpeedDial;
