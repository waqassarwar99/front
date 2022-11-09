import React from "react";
import SidebarChat from "../Chat/SidebarChat/SidebarChat";
import Chats from "./Chats";
import UserSideBarChat from "./SidebarChat/SidebarChat";
import UserChats from "./Chats";

const UserMainChat = () => {
  return (
    <div className="row m-0 p-0">
      <div className="col-3 m-0 p-0">
        <UserSideBarChat />
      </div>
      <div className="col-9 m-0 p-0">
        <UserChats />
      </div>
    </div>
  );
};

export default UserMainChat;
