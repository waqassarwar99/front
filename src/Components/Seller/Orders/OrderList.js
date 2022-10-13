import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const OrderList = () => {
  useEffect(() => {
    const getData = async () => {
      const order = await axios.get("/order/orders");
      setData(order.data);
      console.log(order.data);
    };

    getData();
  }, []);

  const [data, setData] = useState([]);

  const deleteOrder = async (id) => {
    const service = await axios.delete(`/order/deleteOrder/${id}`);
    alert("Order Deleted");
  };

  return (
    <div>
      <div>
        <table className="table table-dark table-hover">
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
            {data.map((appointment) => (
              <tr key={appointment._id} style={{ cursor: "pointer" }}>
                <td>{appointment.user.name}</td>
                <td>{appointment.date}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
