import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import axios from "axios";
import { useSelector } from "react-redux";
import UserSpeedDial from "../SpeedDial/UserSpeedDial";
import Navbar from "../Navbar";
import "./UserOrders.css";
import PrintIcon from "@mui/icons-material/Print";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { CloseOutlined, AccountCircleOutlined } from "@mui/icons-material";

const UserOrders = () => {
  // React-to-Pdf
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [order, setOrder] = useState([]);
  const [data1, setData1] = useState([]);
  const [service, setService] = useState();

  // Marquee print modal

  const [book, setBook] = useState(false);

  const submitBookToggle = () => {
    book ? setBook(false) : setBook(true);
  };

  // Photographer and saloon modal

  const [book1, setBook1] = useState(false);

  const submitBook1Toggle = (data) => {
    console.log(data, "order")
    setService(data);
    book1 ? setBook1(false) : setBook1(true);
  };

  // user info
  const auth = useSelector((state) => state.authReducer);
  const token = useSelector((state) => state.token);

  const { user, isLogged } = auth;

  React.useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`/order/viewOrder/${user._id}`);
      setOrder(data.data);
      const res1 = await axios.get(`/photographer/orders/${user._id}`);
      setData1(res1.data);
    };
    getData();
  }, []);

  // react to print

  return (
    <div>
      <Navbar />
      {isLogged ? (
        <div>
          <UserSpeedDial />
        </div>
      ) : null}

      <div
        style={{
          width: "90%",
          marginLeft: "15px",
          background: "#E8E8E8",
          borderadius: "16px",
          marginLeft: "60px",
        }}
      >
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Dancing Script",
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          Marquees Orders Summary
        </h1>
        <div>
          <table
            className="table table-hover table-striped table-bordered"
            style={{
              textAlign: "center",
            }}
          >
            <thead className="thead-dark">
              <tr className="table-dark">
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Venue</th>
                <th scope="col">Time</th>
                <th scope="col">Service</th>
                <th scope="col">Price</th>
                <th scope="col">Print</th>
              </tr>
            </thead>
            <tbody>
              {order.map((appointment, index) => (
                <tr key={appointment._id} style={{ cursor: "pointer" }}>
                  <td>{index + 1}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.venue}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.orderItems}</td>
                  <td>{appointment.totalPrice}</td>

                  <td style={{ paddingLeft: 30 }}>
                    <Button>
                      <PrintIcon
                        color="success"
                        onClick={() => submitBookToggle()}
                      />
                    </Button>
                    <Dialog
                      aria-labelledby="simple-dialog-title"
                      open={book}
                      onClose={submitBookToggle}
                    >
                      <DialogTitle
                        sx={{
                          display: "flex",
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          fontSize: "30px",
                        }}
                      >
                        Order Summary
                        <CloseOutlined
                          sx={{
                            marginLeft: "100px",
                            marginTop: "-10px",
                            cursor: "pointer",
                            color: "red",
                          }}
                          onClick={submitBookToggle}
                        />
                      </DialogTitle>
                      <Divider />
                      <DialogContent ref={componentRef}>
                        <div
                          className="phoneNoDetails"
                          style={{ marginBottom: "20px" }}
                        >
                          <AccountCircleOutlined />
                          <span
                            style={{
                              fontSize: "20px",
                              fontWeight: "700",
                              fontFamily: "Roboto",
                              marginLeft: "10px",
                            }}
                          >
                            {appointment.orderItems}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "15px 20px",
                            backgroundColor: "#A8A8A8",
                            borderRadius: "10px",
                          }}
                        >
                          <label
                            style={{ fontWeight: "600", marginBottom: "10px" }}
                          >
                            Name: {appointment.shippingInfo.name}
                          </label>

                          <label
                            style={{ fontWeight: "600", marginBottom: "10px" }}
                          >
                            Phone Number: 0{appointment.shippingInfo.phoneNo}
                          </label>

                          <label
                            style={{ fontWeight: "600", marginBottom: "10px" }}
                          >
                            Date: {appointment.date}
                          </label>

                          <label
                            style={{ fontWeight: "600", marginBottom: "10px" }}
                          >
                            Time: {appointment.time}
                          </label>

                          <label
                            style={{ fontWeight: "600", marginBottom: "10px" }}
                          >
                            Venue: {appointment.venue}
                          </label>

                          <label style={{ fontWeight: "600" }}>
                            Total Price: {appointment.totalPrice}
                          </label>
                        </div>
                      </DialogContent>
                      <DialogActions
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          color="success"
                          variant="contained"
                          onClick={handlePrint}
                        >
                          <PrintIcon />
                          {"  "}
                          Print
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Dancing Script",
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          Photographer & Saloon Orders Summary
        </h1>
        <div>
          <table
            className="table table-hover table-striped table-bordered"
            style={{
              textAlign: "center",
            }}
          >
            <thead className="thead-dark">
              <tr className="table-dark">
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Service</th>
                <th scope="col">Price</th>
                <th scope="col">Print</th>
              </tr>
            </thead>
            <tbody>
              {data1.map((appointment, index) => (
                <tr key={appointment._id} style={{ cursor: "pointer" }}>
                  <td>{index + 1}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.orderItems.name}</td>
                  <td>{appointment.totalPrice}</td>

                  <td style={{ paddingLeft: 30 }}>
                    <Button>
                      <PrintIcon
                        color="success"
                        onClick={() => submitBook1Toggle(appointment)}
                      />
                    </Button>
                    <Dialog
                      aria-labelledby="simple-dialog-title"
                      open={book1}
                      onClose={submitBook1Toggle}
                    >
                      <DialogTitle
                        sx={{
                          display: "flex",

                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          fontSize: "30px",
                        }}
                      >
                        Order Summary
                        <CloseOutlined
                          sx={{
                            marginLeft: "100px",
                            marginTop: "-10px",
                            cursor: "pointer",
                            color: "red",
                          }}
                          onClick={submitBook1Toggle}
                        />
                      </DialogTitle>
                      <Divider />
                      <DialogContent>
                        <div
                          className="phoneNoDetails"
                          style={{ marginBottom: "20px" }}
                        >
                          <AccountCircleOutlined />
                          <span
                            style={{
                              fontSize: "20px",
                              fontWeight: "700",
                              fontFamily: "Roboto",
                              marginLeft: "10px",
                            }}
                          >
                            {service?.orderItems?.name}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",

                            padding: "15px 20px",
                            backgroundColor: "#A8A8A8",
                            borderRadius: "10px",
                          }}
                        >
                          <label
                            style={{ fontWeight: "600", marginBottom: "10px" }}
                          >
                            Name: {service?.shippingInfo?.name}
                          </label>

                          <label
                            style={{ fontWeight: "600", marginBottom: "10px" }}
                          >
                            Phone Number: 0{service?.shippingInfo?.phoneNo}
                          </label>

                          <label
                            style={{ fontWeight: "600", marginBottom: "10px" }}
                          >
                            Date: {service?.date}
                          </label>

                          <label
                            style={{ fontWeight: "600", marginBottom: "10px" }}
                          >
                            Time: {service?.time}
                          </label>
                          <label style={{ fontWeight: "600" }}>
                            Total Price: {service?.totalPrice}
                          </label>
                        </div>
                      </DialogContent>
                      <DialogActions
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button color="success" variant="contained">
                          <PrintIcon /> Print
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
