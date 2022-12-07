import React, { useState, useEffect } from "react";
import moment from "moment";

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
import axios from "axios";

const PhotographerSubscription = (props) => {
  const navigate = useNavigate();

  // date check

  const date5 = new Date();
  const date6 = moment().format('YYYY-MM-DD');
  const time6 = moment().format('hh:mm:ss');
  console.log(time6);
  // console.log("currentDate", currentDate);

  // Basic addons
  const basicAddOns = props.data.basicPlan.addOns;
  const addOnsArr = basicAddOns.split(",");

  // Gold Addons
  const goldAddOns = props.data.goldPlan.addOns;
  const goldAddOnsArr = goldAddOns.split(",");

  //Platinum addons
  const platinumAddOns = props.data.platinumPlan.addOns;
  const platinumAddOnsArr = platinumAddOns.split(",");

  const [book, setBook] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState([]);

  const submitBookToggle = (data) => {
    setPrice(data);
    book ? setBook(false) : setBook(true);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/photographer/orders");
      setOrder(res.data);
    };
    getData();
  });

  const appointment = async (e) => {
    e.preventDefault();
    const check = (order) => {
      return (
        order.time === time &&
        order.orderItems[0].name === props.data.name &&
        order.date == date
      );
    };
    const orders = order.filter(check);
    if (orders.length > 0) {
      alert("Photographer is already booked");
    } else {
      navigate("/photographerpaymentform", {
        state: {
          date,
          time,
          items: props.data,
          totalPrice: price,
          orderItems: props.data,
        },
      });
    }
  };

  return (
    <div
      className="subscription"
      style={{
        height: "100%",
        gridTemplateColumns: "35% 35% auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
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
          minHeight: 480,
          marginLeft: 5,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontFamily: "Dancing Script",
            textAlign: "center",
          }}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            className="openBookModal"
            onClick={() => submitBookToggle(props.data.basicPlan.price)}
            sx={{ marginTop: "140px" }}
          >
            Choose Plan
          </Button>
        </div>
      </Box>

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
          Book
          <CloseOutlined
            sx={{
              marginLeft: "140px",
              marginTop: "-10px",
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
            <label style={{ fontWeight: "600" }}>
              Date:
              <input
                type="date"
                name="date"
                min={date6}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  marginLeft: "10px",
                  marginBottom: "20px",
                }}
              />
            </label>

            <label style={{ fontWeight: "600" }}>
              Time:
              <input
                type="time"
                name="time"
                min={time6}
                onChange={(e) => setTime(e.target.value)}
                style={{ marginLeft: "10px", width: "140px" }}
              />
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
            minHeight: 480,
            marginLeft: 5,
          }}
        >
          {" "}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontFamily: "Dancing Script",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{ marginTop: "80px" }}
              onClick={() => submitBookToggle(props.data.goldPlan.price)}
            >
              Choose Plan
            </Button>
          </div>
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
            minHeight: 480,
            marginLeft: 5,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontFamily: "Dancing Script",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{ marginTop: "80px" }}
              onClick={() => submitBookToggle(props.data.platinumPlan.price)}
            >
              Choose Plan
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default PhotographerSubscription;
