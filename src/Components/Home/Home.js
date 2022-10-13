import React from "react";
import { useSelector } from "react-redux";
import Carousol from "./Carousol";
import Explore from "./Explore";
import Photographers from "./Photographers";
import Marquee from "./Marquee";
import MakeupArtist from "./MakeupArtist";
import "./Home.css";
import Navbar from "./Navbar";
import UserSpeedDial from "./SpeedDial/UserSpeedDial";
const Home = () => {
  const auth = useSelector((state) => state.authReducer);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  const { user, isLogged } = auth;

 
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {isLogged ? (
        <div>
          <UserSpeedDial />
        </div>
      ) : null}

      <div>
        <Carousol />
      </div>
      <div style={{ marginTop: "100x" }}>
        <Explore />
      </div>
      <div>
        <Photographers />
      </div>
      <div>
        <Marquee />
      </div>
      <div>
        <MakeupArtist />
      </div>
    </div>
  );
};

export default Home;
