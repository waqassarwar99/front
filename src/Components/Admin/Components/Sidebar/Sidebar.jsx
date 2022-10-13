import React from 'react'
import './sidebar.scss'

import {Logout,ManageAccounts,Group,Home,PersonAdd,Feed} from '@mui/icons-material';

import { Link } from 'react-router-dom'
import axios from 'axios';
import logo1 from "../../../../images/logo1.png"

function Sidebar() {
    const handleLogout = async() => {
        try {
            await axios.get('/user/logout');
            localStorage.removeItem('firstLogin');
            window.location.href = "/login"
        } catch (error) {

            window.location.href = "/";
        }
    }
  return (
    <div className="sidebars" style={{backgroundColor: "rgba(58, 53, 65, 0.87)"}}>
      <div>
        <span> <img src={logo1} alt="logo" width={170} height={60} style={{marginLeft: "10px", marginTop: "10px"}}  /></span>
      </div>
      <hr />
      <div className="center">
        <ul className="sidebarUL">
        
          <Link to="/" style={{ textDecoration: "none" }}>
          
          <li>
            <Home className="icons" />
            <span>Dashboard</span>
          </li>
          </Link>
        
          <Link to="/admin/user" style={{ textDecoration: "none" }}>
            <li>
              <Group className="icons"  />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/seller" style={{ textDecoration: "none" }}>
            <li>
              <PersonAdd className="icons"  />
              <span>Seller Request</span>
            </li>
          </Link>
          <Link to="/admin/complaints" style={{ textDecoration: "none" }}>
            <li>
             
              <Feed className="icons"  />
              <span>Complaints</span>
            </li>
          </Link>
          
          <Link to="/admin/profile" style={{ textDecoration: "none" }}>
            <li>
              <ManageAccounts className="icons"  />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <Logout className="icons"  />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar