import React from "react";
import SidebarChat from "../Chat/SidebarChat/SidebarChat";
import Chats from "./Chats";
import UserSideBarChat from "./SidebarChat/SidebarChat";
import UserChats from "./Chats";
import Navbar from "../Home/Navbar";

const UserMainChat = () => {
  return (
    <>
      <Navbar />
      <div className="row m-0 p-0">
        <div className="col-3 m-0 p-0">
          <UserSideBarChat />
        </div>
        <div className="col-9 m-0 p-0">
          <UserChats />
        </div>
      </div>
    </>
  );
};

export default UserMainChat;
