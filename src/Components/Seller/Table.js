import React, { useEffect, useState } from "react";
import axios from "axios";


export default function BasicTable() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get("/order/viewProductOrder");
      setOrder(data.data);
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
          {order?.map((appointment) => {
            let date = appointment?.createdAt?.split("T");
            return (
              <tr key={appointment?._id} style={{ cursor: "pointer" }}>
                <td>
                  {appointment?.orderItems?.map((item) => (
                    <div>{item?.product?.name}</div>
                  ))}
                </td>
                <td>{appointment?.shippingInfo.name}</td>
                <td>{appointment?.totalPrice}</td>
                <td>{date[0]}</td>
                <td>{date[1]?.split(".")[0]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
