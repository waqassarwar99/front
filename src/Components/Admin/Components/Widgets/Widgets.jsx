import React from 'react'
import './widget.css'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

function Widgets() {
  return (
    <div className='widget'>
        <div className="left">
            <span className="title">USERS</span>
            <span className="counters" style={{ color: 'gray' }}>55656</span>
            <span className="link" style={{ color: 'gray' }}>See all Users</span>
        </div>
        <div className="right">
            <div className="percentage positive"><KeyboardArrowUpOutlinedIcon />20%</div>
            <PersonOutlineOutlinedIcon className='icon'/>
        </div>
    </div>
  )
}

export default Widgets