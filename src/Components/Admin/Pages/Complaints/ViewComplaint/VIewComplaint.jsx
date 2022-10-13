import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'

import ViewComplaints from '../../../Components/Complaints/ViewComplaints'
import './viewComplaint.scss'

function ViewComplaint() {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer"> 
        <ViewComplaints />
      </div>
    </div>
  )
}

export default ViewComplaint