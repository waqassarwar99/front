import React, { useState, useEffect } from "react";
import "./cards.css";
import Card from "./Card";
import { cardsData } from "./Data";
import axios from "axios";

const Cards = () => {
  // PhotoGrapher orders
  const [services, setServices] = React.useState([]);
  const [userId, setUserId] = useState("");

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token },
      });
      console.log(res.data);
      setUserId(res.data._id);
    };

    getData();
  }, []);

  //photographer orders
  React.useEffect(() => {
    const getServices = async () => {
      const res = await axios.get("/photographer/viewOrder");
      setServices(res.data.filter((service) => service.seller._id === id));
    };
    getServices();
  }, []);

  // // Marquee Orders

  const [marqueeOrder, setMarqueeOrder] = React.useState([]);

  React.useEffect(() => {
    const getServices = async () => {
      const res = await axios.get("/order/orders");
      setMarqueeOrder(res.data.filter((service) => service.seller._id === id));
    };
    getServices();
  }, []);

  // Product Orders
  const [order, setOrder] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      const data = await axios.get("/order/viewProductOrder");
      setOrder(data.data);
    };
    getData();
  }, []);

  // Total sales

  const [totalSales, setTotalSales] = React.useState(0);
  React.useEffect(() => {
    const getData = async () => {

      const data = await axios.post("/order/totalSale", { userId: id });
      setTotalSales(data.data.msg);
      console.log(data.data.msg, "total");
    };
    getData();
  }, []);
  const [dailySales, setDailySales] = React.useState(0);
  React.useEffect(() => {
    const getData = async () => {
      const data = await axios.post("/order/dailySale", { userId });
      console.log(data.data.msg);
      setDailySales(data.data.msg);
    };
    getData();
  }, []);

  return (
    <div className="cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={
                card.title === "Bookings"
                  ? services.length + marqueeOrder.length
                  : card.title === "Total Sales"
                  ? "PKR " + totalSales
                  : "$ " + card.value
              }
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};
export default Cards;
