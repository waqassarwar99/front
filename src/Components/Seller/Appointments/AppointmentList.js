import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AppointmentList = () => {
  useEffect(() => {
    const getData = async () => {
      const appointment = await axios.get("/order/orders");
      setData(appointment.data);
      console.log("Helo", appointment.data);
    };

    getData();
  }, []);

  const [data, setData] = useState([]);

  //Seller Data

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/user/sellerdetail", {
        headers: { Authorization: token },
      });
      setUserId(res.data._id);
    };

    getData();
  }, []);
  const [userId, setUserId] = useState("");

  const deleteOrder = async (id) => {
    const service = await axios.delete(`/order/deleteOrder/${id}`);
    alert("Booking Deleted");
    window.location.href="/appointment"
  };

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Service</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((appointment) =>
            appointment.seller._id === userId ? (
              <tr key={appointment._id} style={{ cursor: "pointer" }}>
                <td>{appointment.user.name}</td>
                <td>{appointment.date.split("T")[0]}</td>
                <td>{appointment.time}</td>
                <td>{appointment.orderItems[0].name}</td>

                <td style={{ paddingLeft: 30 }}>
                  <Button>
                    <DeleteIcon
                      color="error"
                      onClick={() => deleteOrder(appointment._id)}
                    />
                  </Button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
