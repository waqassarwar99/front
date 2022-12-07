import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import {
  fetchAllUsers,
  dispatchGetAllUser,
} from "../../../redux/actions/usersAction";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import "./sidebarChat.css";
import UserSpeedDial from "../../Home/SpeedDial/UserSpeedDial";
import Navbar from "../../Home/Navbar";

function UserSideBarChat() {
  const auth = useSelector((state) => state.authReducer);
  const { user, isAdmin, isLogged } = auth;
  const token = useSelector((state) => state.token);
  const [message, setMessage] = React.useState([]);
  const users = useSelector((state) => state.users);
  const [callback, setCallBack] = React.useState(false);
  const [keyword, setkeyword] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState("");
  const [userId, setId] = useState("");
  const navigate = useNavigate();

  // Seller Data

  const token1 = localStorage.getItem("token");

  useEffect(() => {
    const getSellerData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token1 },
      });
      setName(res.data.name);
      setId(res.data._id);
    };

    getSellerData();
  }, []);

  const handleClick1 = async (userId, chatName) => {
    const res = await axios.post(
      `/chat/chat`,
      { userId, chatName },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    navigate("/userchat", { state: res.data._id });
  };

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUser(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleClick = (data) => {
    navigate("/userchat", { state: data });
  };

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/chat/getChat", { userId: user._id });
      setMessage(res.data);
    };
    getData();
  }, []);
  return (
    <>
      {isLogged ? (
        <div>
          <UserSpeedDial />
        </div>
      ) : null}
      <div
        className="sidebars"
        style={{ padding: 20, backgroundColor: "#3CB043" }}
      >
        <div
          className="sidebar_header border-bottom pb-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="" style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={user.avatar} style={{ marginBottom: 0 }} />
            <div
              style={{
                marginLeft: 10,
                color: "black",
                fontSize: "17px",
                fontWeight: "600",
                color: "white",
              }}
            >
              {user.name}
            </div>
          </div>
          <div className="header_right">
            <IconButton>
              <DonutLargeIcon style={{ color: "white" }} />
            </IconButton>
            <IconButton>
              <ChatIcon style={{ color: "white" }} />
            </IconButton>
            <IconButton>
              <MoreVertIcon style={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
        <div className="sidebar_chats mt-4">
          {message.map((user) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              className="border-bottom mb-4"
              onClick={() => handleClick(user)}
              key={user._id}
            >
              <div style={{ display: "flex" }}>
                <Avatar src={user.seller.image} style={{ marginBottom: 20 }} />
                <span
                  style={{
                    marginLeft: "10px",
                    marginBottom: "20px",
                    marginTop: "10px",
                    fontSize: "18px",
                    fontWeight: "600",
                    color:"white"
                  }}
                >
                  {user.seller.name}
                </span>
                <br />
                {user.latestMessage ? (
                  <span style={{ fontSize: 10 }}>
                    {user.latestMessage.content}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserSideBarChat;
