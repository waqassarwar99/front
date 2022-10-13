import React, { useState } from "react";
import "./sidebar.css";
import Logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "./Data";

const Sidebar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  const navigation = (heading, index) => {
    setSelected(index);
    if (heading === "Dashboard") {
      navigate("/dashboard");
    } else if (heading === "Orders") {
      navigate("/orders");
    } else if (heading === "Products") {
      navigate("/sellerproducts");
    } else if (heading === "Marquees") {
      navigate("/marquees");
    } else if (heading === "Photographer") {
      navigate("/photographer");
    } else if (heading === "Saloon") {
      navigate("/saloon");
    } else if (heading === "Bookings") {
      navigate("/appointment");
    }
    console.log(heading);
  };
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="" />
        <span>Events Empire</span>
      </div>

      {/* Menu */}
      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => {
                navigation(item.heading, index);
              }}
            >
              <item.icon />
              <span>{item.heading} </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
