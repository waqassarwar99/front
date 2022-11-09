import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Profiles from '../../Components/Profile/Profiles'
import './profile.css'

function Profile() {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Profiles />
      </div>
    </div>
  )
}

export default Profile;