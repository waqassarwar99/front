import React from 'react'
import "./home.scss"
import Sidebar from '../../Components/Sidebar/Sidebar'
import Widgets from '../../Components/Widgets/Widgets'
import Chart from '../../Components/Chart/Chart'
import Featured from '../../Components/Featured/Featured'


const Home = () => {
  return (
    <div className='homes'>
        <Sidebar />
        <div className="homeContainers">
            <div className="widgets">
                <Widgets />
                <Widgets />
                <Widgets />
                <Widgets />
            </div>
            <div className="charts">
              <Featured />
              <Chart />
            </div>
            
        </div>
    </div>
  )
}

export default Home