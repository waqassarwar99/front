import React from 'react'
import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Featured() {
  return (
    <div className='featured'>
        <div className="top">
            <h1 className="title">Total Revenue</h1>
            <MoreVertIcon fontSize='small'/>
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth= {5}/>
            </div>
            <p className="title">Total sales made today</p>
            <p className="amount">Rs 100000</p>
            <p className="decs">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, culpa.</p>
            {/* <div className="summary">
                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult">
                        <KeyboardArrowDownIcon fontSize='small'/>
                        <div className="resultAmount">$12k</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult positive">
                        <KeyboardArrowDownIcon fontSize='small'/>
                        <div className="resultAmount">$12k</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult">
                        <KeyboardArrowDownIcon fontSize='small'/>
                        <div className="resultAmount">$12k</div>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default Featured