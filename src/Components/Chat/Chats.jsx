import React from "react";
import Avatar from "@mui/material/Avatar";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import "./chats.css";

const initialState = {
  sender: "",
  receiver: "",
  message: "",
  received: "",
  timeStamp: "",
  err: "",
  success: "",
};

function Chats() {
  const [values, setUser] = React.useState(initialState);
  const { message, err } = values;
  const [messages, setMessage] = React.useState([]);
  const [userId, setId] = React.useState([]);

  const auth = useSelector((state) => state.authReducer);
  const { user } = auth;
  const token = useSelector((state) => state.token);

  const [chat, setChat] = React.useState([]);

  const token1 = localStorage.getItem("token");

  React.useEffect(() => {
    const getSellerData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token1 },
      });
      setId(res.data._id);
    };

    getSellerData();
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...values, [name]: value, err: "", success: "" });
  };

  const location = useLocation();
  console.log(location.state, "location");
  const chatId = location.state._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/chat/sendMessage", {
        content: message,
        chatId,
        userId,
      });
      setUser({ ...values, err: "", success: res.data.msg });
    } catch (error) {
      err.response.data.msg &&
        setUser({ ...values, err: err.response.data.msg, success: "" });
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/chat/getChat", { userId });
      setChat(res.data);
    };
    getData();
  }, [message]);

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.post(`/chat/getMessage`, { chatId });
      setMessage(res.data);
    };
    getData();
  });
  return (
    <>
      {user ? (
        <div className="chatss">
          <div className="caht_header">
            <div
              key={user._id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar src={location?.state?.user?.avatar} />
              <div className="chatHeader_info">
                <h3>{location?.state?.user?.name}</h3>
              </div>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((message) => (
              <p
                className={
                  message.sender === userId
                    ? "chatMessage chatReceiver"
                    : "chatMessage"
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className=""
                    style={{
                      backgroundColor:
                        message.sender == userId ? "#128c7e" : "#ece5dd",
                      padding: 10,
                      color: message.sender == userId ? "white" : "black",
                      borderRadius: 25,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {message.content}
                  </div>
                </div>
                <div>{format(message.createdAt)}</div>
              </p>
            ))}
          </div>

          <div className="chat_footer">
            <input
              type="text"
              name="message"
              placeholder="Type Message"
              value={message}
              onChange={handleChangeInput}
              style={{ border: "none" }}
            />
            <SendOutlinedIcon
              onClick={handleSubmit}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Chats;
