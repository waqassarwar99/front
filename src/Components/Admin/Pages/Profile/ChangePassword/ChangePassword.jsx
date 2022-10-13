import React from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import ChangePassword from '../../../Components/Profile/ChangePassword/ChangePassword';


function Profiles() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer" style={{ background: "#F8F0E9" }}>
        
        <ChangePassword />
      </div>
    </div>
  );
}

export default Profiles;
