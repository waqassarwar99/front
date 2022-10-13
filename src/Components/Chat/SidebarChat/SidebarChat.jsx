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
  const [name, setName] = useState("")
  const navigate = useNavigate();


  // Seller Data

  const token1 = localStorage.getItem("token");

  useEffect(() => {
    const getSellerData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token1 },
      });
      setName(res.data.name);
    };
    
    getSellerData();
  }, []);
  console.log("name", name)
  

// User Data
  const getData = async () => {
    const res = await axios.get(`/message/allUsers?search=${keyword}`, {
      headers: {
        Authorization: token,
      },
    });
    setAllUsers(res.data);
  };

  const handleClick1 = async (userId, chatName) => {
    const res = await axios.post(
      `/message/chat`,
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
    console.log(data);
    navigate("/admin/chat", { state: data });
  };

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/message/getChat", {
        headers: {
          Authorization: token,
        },
      });
      setMessage(res.data);
      console.log(res.data)
    };
    getData();
  }, []);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 385 }}
      role="presentation"
        // onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
      style={{ backgroundColor: 'teal', height: '100vh' }}
    >
      <div className="">
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            border: "1px solid white",
            marginBottom: 10,
            marginTop: 20,
            width: 366,
            marginLeft: 10
          }}
        >
          <SearchIcon style={{ marginRight: 5, marginLeft: 10, color: 'white' }} />
          <input
            type="text"
            name="search"
            onChange={(e) => setkeyword(e.target.value)}
            id=""
            placeholder="Search User"
            style={{ color: 'white' }}
          />
          <button className="" onClick={getData}>
            <SearchIcon style={{ color: 'white' }} />
          </button>
        </div>
        <div className="" style={{}}></div>
        {keyword
          ? users.map((usr) => (
            usr.fName.toLowerCase().startsWith(keyword.toLowerCase()) && user._id !== usr._id  ? 
              <div
                className="mb-2"
                key={usr._id}
                onClick={() => handleClick1(usr._id, usr.fName)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 5,
                  color: "black",
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <div style={{ paddingLeft: 10 }}>
                  <img
                    src={usr.avatar}
                    alt=""
                    style={{ width: 30, height: 30, borderRadius: 50 }}
                  />
                  <span style={{color: "black"}}>

                  {name}
                  </span>
                </div>
                <span style={{ color: "black" }}>{usr.fName + " " + usr.lName}</span>
              </div> : null
            ))
          : users.map((usr) => (
              user._id !== usr._id ?
              <div
                className="mb-2"
                key={usr._id}
                onClick={() => handleClick1(usr._id, usr.fName)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 5,
                  color: "white",
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <div style={{ paddingLeft: 10 }}>
                  <img
                    src={usr.avatar}
                    alt=""
                    style={{ width: 30, height: 30, borderRadius: 50 }}
                  />
                </div>
                <span style={{ color: "black" }}>{usr.fName + " " + usr.lName}</span>
              </div>: null
            ) )}
      </div>
    </Box>
  );

  return (
    <>
      <div className="sidebars" style={{ padding: 20, marginTop: 10, backgroundColor: 'green' }}>
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
            <div style={{ marginLeft: 10, color: 'black' }}>{name}</div>
          </div>
          <div className="header_right">
            <IconButton>
              <DonutLargeIcon style={{ color: 'black' }} />
            </IconButton>
            <IconButton>
              <ChatIcon style={{ color: 'black' }} />
            </IconButton>
            <IconButton>
              <MoreVertIcon style={{ color: 'black' }} />
            </IconButton>
          </div>
        </div>
        <div className="sidebar_chats mt-4">
          {message.map((user) =>
            user.user.map((admin) =>
              admin._id == "6324909b42ab3898a89322d8" ? null : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  className="border-bottom mb-4"
                  onClick={() => handleClick(user._id)}
                  key = {user._id}
                >
                  <Avatar src={admin.avatar} style={{ marginBottom: 10 }} />
                  <div className="">
                    <span>{admin.fName + " " + admin.lName}</span>
                    <br />
                    {user.latestMessage ? (
                      <span style={{ fontSize: 10 }}>
                        {user.latestMessage.content}
                      </span>
                    ) : null}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </>
  );
}

export default SideBarChat;
