import React from "react";
import SidebarChat from "../Chat/SidebarChat/SidebarChat";
import Chats from "./Chats";

const MainChat = () => {
  return (
    <div className="row m-0 p-0">
      <div className="col-3 m-0 p-0">
        <SidebarChat />
      </div>
      <div className="col-9 m-0 p-0">
        <Chats />
      </div>
    </div>
  );
};

export default MainChat;
