import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { CloseOutlined, AccountCircleOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Subscription = (props) => {
  // Basic addons
  const basicAddOns = props.data.basicPlan.addOns;
  const addOnsArr = basicAddOns.split(",");

  // Gold Addons
  const goldAddOns = props.data.goldPlan.addOns;
  const goldAddOnsArr = goldAddOns.split(",");

  //Platinum addons
  const platinumAddOns = props.data.platinumPlan.addOns;
  const platinumAddOnsArr = platinumAddOns.split(",");

  // Date picker start

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  // Date Picker end

  const navigate = useNavigate();

  const [book, setBook] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState([]);

  const submitBookToggle = (data) => {
    setPrice(data);
    book ? setBook(false) : setBook(true);
  };

  const auth = useSelector((state) => state.authReducer);
  const { user } = auth;

  const appointment = async (e) => {
    e.preventDefault();
    const check = (order) => {
      console.log("first", order.date);
      console.log("first1", date);
      return (
        order.time === time &&
        order.orderItems[0].name === props.data.name &&
        order.date == date
      );
    };
    const orders = order.filter(check);
    if (orders.length > 0) {
      alert("Marquee is already booked");
    } else {
      setTotalPrice(price * guest);
      navigate("/paymentform", {
        state: { totalPrice: price * guest, date, time, items: props.data },
      });
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/order/orders");
      setOrder(res.data);
    };
    getData();
  });

  return (
    <div
      className="subscription"
      style={{
        height: "100%",
        gridTemplateColumns: "35% 35% auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: "10px",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 4,
          borderRadius: 5,
          p: 2,
          width: 350,
          marginTop: 5,
          height: 500,
          marginLeft: 5,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", fontStyle: "Roboto", textAlign: "center" }}
        >
          Basic
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontStyle: "Roboto",
            textAlign: "center",
            color: "red",
          }}
          gutterBottom
        >
          PKR {props.data.basicPlan.price}
        </Typography>

        <Divider />
        {addOnsArr.map((arr) => (
          <Stack mt={4} direction="row" gap={2}>
            <FileDownloadDoneIcon />
            <Typography variant="body1">{arr}</Typography>
          </Stack>
        ))}

        <Button
          variant="contained"
          className="openBookModal"
          onClick={() => submitBookToggle(props.data.basicPlan.price)}
          sx={{ marginTop: "90px", marginLeft: "80px" }}
        >
          Choose Plan
        </Button>
      </Box>

      <Dialog
        aria-labelledby="simple-dialog-title"
        open={book}
        onClose={submitBookToggle}
      >
        <DialogTitle
          sx={{
            display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            fontWeight: "bold",
            fontFamily: "Roboto",
            fontSize: "30px",
          }}
        >
          Book
          <CloseOutlined
            sx={{
              marginLeft: "140px",
              marginTop: "-40px",
              cursor: "pointer",
              color: "red",
            }}
            onClick={submitBookToggle}
          />
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div className="phoneNoDetails" style={{ marginBottom: "20px" }}>
            <AccountCircleOutlined />
            <span
              style={{
                fontSize: "20px",
                fontWeight: "700",
                fontFamily: "Roboto",
                marginLeft: "10px",
              }}
            >
              {props.data.name}
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
            <div style={{ display: "flex" }}>
              <label style={{ fontWeight: "600" }}>Date: </label>
              <input
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                style={{
                  marginLeft: "10px",
                  marginBottom: "20px",
                }}
              />
            </div>
            <div style={{ display: "flex" }}>
              <label
                for="slot"
                style={{ fontWeight: "600", marginRight: "10px" }}
              >
                Time:
              </label>
              <select
                name="select"
                id="slot"
                style={{ width: "100%" }}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label style={{ fontWeight: "600", marginTop: "20px" }}>
                No of Guests:
              </label>
              <input
                type="text"
                name="guest"
                onChange={(e) => setGuest(e.target.value)}
                style={{
                  marginLeft: "10px",
                  marginTop: "20px",
                  width: "70px",
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button color="success" variant="contained" onClick={appointment}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <div>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 4,
            borderRadius: 5,
            p: 2,
            width: 350,
            marginTop: 5,
            height: 500,
            marginLeft: 5,
          }}
        >
          {" "}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontStyle: "Roboto",
              textAlign: "center",
              color: "warning.light",
            }}
          >
            Gold
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontStyle: "Roboto",
              textAlign: "center",
              color: "red",
            }}
            gutterBottom
          >
            PKR {props.data.goldPlan.price}
          </Typography>
          <Divider />
          {goldAddOnsArr.map((arr) => (
            <Stack mt={4} direction="row" gap={2}>
              <FileDownloadDoneIcon />
              <Typography variant="body1">{arr}</Typography>
            </Stack>
          ))}
          <Button
            variant="contained"
            sx={{ marginTop: "90px", marginLeft: "80px" }}
            onClick={() => submitBookToggle(props.data.goldPlan.price)}
          >
            Choose Plan
          </Button>
        </Box>
      </div>

      <div>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 4,
            borderRadius: 5,
            p: 2,
            width: 350,
            marginTop: 5,
            height: 500,
            marginLeft: 5,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontStyle: "Roboto",
              textAlign: "center",
            }}
          >
            Platinum
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontStyle: "Roboto",
              textAlign: "center",
              color: "red",
            }}
            gutterBottom
          >
            PKR {props.data.platinumPlan.price}
          </Typography>
          <Divider />
          {platinumAddOnsArr.map((arr) => (
            <Stack mt={4} direction="row" gap={2}>
              <FileDownloadDoneIcon />
              <Typography variant="body1">{arr}</Typography>
            </Stack>
          ))}
          <Button
            variant="contained"
            sx={{ marginTop: "40px", marginLeft: "80px" }}
            onClick={() => submitBookToggle(props.data.platinumPlan.price)}
          >
            Choose Plan
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Subscription;
