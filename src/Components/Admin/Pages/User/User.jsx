import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Users from '../../Components/User/User';
import './user.css'

function User() {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
      
        <h1 style={{display: "flex", justifyContent:"center", fontFamily: "Roboto", marginTop: "10px"}}>Users</h1>
        <Users />
      </div>
    </div>
  )
}

export default User