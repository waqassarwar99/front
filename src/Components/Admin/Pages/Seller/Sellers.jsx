import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'

import Seller from '../../Components/Seller/Seller';
import './seller.css'

function Sellers() {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">

         <h1 style={{display: "flex", justifyContent:"center", fontFamily: "Roboto", marginTop: "10px"}}>Seller Requests</h1>
        <Seller />
      </div>
    </div>
  )
}

export default Sellers;