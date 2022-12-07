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

function SideBarChat() {
  const auth = useSelector((state) => state.authReducer);
  const { user, isAdmin } = auth;
  const token = useSelector((state) => state.token);
  const [message, setMessage] = React.useState([]);
  const users = useSelector((state) => state.users);
  const [callback, setCallBack] = React.useState(false);
  const [keyword, setkeyword] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState("");
  const [userId, setId] = useState("");
  const [sellerImage, setSellerImage] = useState("");
  const navigate = useNavigate();

  // Seller Data

  const token1 = localStorage.getItem("token");

  useEffect(() => {
    const getSellerData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token1 },
      });
      setName(res.data.name);
      setSellerImage(res.data.image);

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
    navigate("/admin/chat", { state: res.data._id });
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
    navigate("/sellerChat", { state: data });
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
            <Avatar src={sellerImage} style={{ marginBottom: 0 }} />
            <p
              style={{
                marginLeft: 10,
                color: "white",
                fontSize: "17px",
                fontWeight: "600",
                marginTop: "10px",
              }}
            >
              {name}
            </p>
          </div>
          <div className="header_right">
            <IconButton>
              <DonutLargeIcon style={{ color: "black" }} />
            </IconButton>
            <IconButton>
              <ChatIcon style={{ color: "black" }} />
            </IconButton>
            <IconButton>
              <MoreVertIcon style={{ color: "black" }} />
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
                <Avatar src={user.user.avatar} style={{ marginBottom: 10 }} />
                <span
                  style={{
                    fontSize: "17px",
                    marginLeft: "10px",
                    marginTop: "5px",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  {user.user.name}
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

export default SideBarChat;
