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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CloseOutlined, AccountCircleOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

// Table

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    fontFamily: "Roboto",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Subscription = (props) => {
  const navigate = useNavigate();

  
  const [book, setBook] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Lunch");
  const [venue, setVenue] = useState("");
  const [menu, setMenu] = useState("");
  const [guest, setGuest] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState([]);

  const submitBookToggle = (data) => {
    console.log(data);
    setPrice(data);
    book ? setBook(false) : setBook(true);
  };

  const auth = useSelector((state) => state.authReducer);
  const { user } = auth;

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
      alert("Marquee is already booked");
    } else {
      setTotalPrice(price * guest + parseInt(venue));
      console.log(time);
      navigate("/paymentform", {
        state: {
          totalPrice: parseInt(price * guest) + parseInt(venue),
          date,
          time,
          items: props.data,
        },
      });
    }
  };

  React.useEffect(() => {
    console.log("use Effect");
    const getData = async () => {
      const res = await axios.get("/order/orders");
      setOrder(res.data);
    };
    getData();
  }, []);

  return (
    <div
      className="subscription"
      style={{
        width: "60%",
        marginTop: "50px",
      }}
    >
      {/* Booking Model */}
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

            <div style={{ display: "flex", marginTop: "20px" }}>
              <label
                for="slot"
                style={{ fontWeight: "600", marginRight: "10px" }}
              >
                Venue:
              </label>
              <select
                name="select"
                id="slot"
                style={{ width: "100%" }}
                onChange={(e) => setVenue(e.target.value)}
              >
                {props.data.goldPlan.map((data) => (
                  <option value={data.venueGoldPrice}> {data.venueName}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <label
                for="slot"
                style={{ fontWeight: "600", marginRight: "10px" }}
              >
                Menu:
              </label>
              <select
                name="select"
                id="slot"
                style={{ width: "100%" }}
                onChange={(e) => setMenu(e.target.value)}
              >
                {props.data.basicPlan.map((data, index) => (
                  <option value={data.basicPrice}> Menu {index + 1}</option>
                ))} 
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
      {/* Booking Model End*/}

      <div style={{ marginLeft: "20px", marginTop: "40px" }}>
        <h2 style={{ fontFamily: "cursive", marginBottom: "20px" }}>
          Venue Pricing
        </h2>

        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 900 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Package Name</StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">Services</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.goldPlan.map((data) => (
                <StyledTableRow key={data.name}>
                  <StyledTableCell component="th" scope="row">
                    <span style={{ fontWeight: "700", fontSize: "17px" }}>
                      {data.venueName}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <span style={{ fontWeight: "800", fontSize: "19px" }}>
                      PKR {data.venueGoldPrice}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {data.venueGoldService.split(",").map((data1) => (
                      <StyledTableRow align="right">
                        <StyledTableCell align="left">{data1}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ marginLeft: "20px", marginTop: "40px" }}>
        <h2 style={{ fontFamily: "cursive", marginBottom: "20px" }}>
          Menu Pricing
        </h2>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Package Name</StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">Services</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.basicPlan.map((data, index) => (
                <StyledTableRow key={data.name}>
                  <StyledTableCell component="th" scope="row">
                    <span style={{ fontWeight: "700", fontSize: "17px" }}>
                      Menu {index + 1}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <span style={{ fontWeight: "800", fontSize: "19px" }}>
                      PKR {data.basicPrice}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {data.basicService.split(",").map((data1) => (
                      <StyledTableRow align="right">
                        <StyledTableCell align="left">{data1}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </StyledTableCell>

                  {/* <Button
                    variant="contained"
                    className="openBookModal"
                    onClick={() =>
                      submitBookToggle(props.data.basicPlan[index].basicPrice)
                    }
                    sx={{ marginTop: "90px", marginLeft: "80px" }}
                  >
                    Choose Plan
                  </Button> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Subscription;
