import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./table.css";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];

const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get("/order/viewProductOrder");
      setOrder(data.data);
      console.log("product", data.data);
    };
    getData();
  }, []);

  return (
    <div className="Table">
      <h3
        style={{
          fontFamily: "Dancing Script",
          fontWeight: "800",
          fontSize: "30px",
        }}
      >
        Recent Orders
      </h3>
    
       <table className="table table-hover table-striped table-bordered">
        <thead className="thead-dark">
          <tr className="table-dark">
            <th scope="col">Product</th>
            <th scope="col">User Name</th>
            <th scope="col">Total Price</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {order.map((appointment) =>
             (
              <tr key={appointment._id} style={{ cursor: "pointer" }}>
                <td>{appointment.orderItems.map((item) => (
                    <div>{item.product.name}</div>
                  ))}</td>
                <td>{appointment.shippingInfo.name}</td>
                <td>{appointment.totalPrice}</td>
                <td>{appointment.createdAt.split("T")[0]}</td>
                <td>{appointment.createdAt.split("T")[1]}</td>
                
              </tr>
            ) 
          )}
         
        </tbody>
      </table>
    </div>
  );
}
