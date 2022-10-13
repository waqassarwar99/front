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

const PhotographerSubscription = (props) => {
  const navigate = useNavigate();

  console.log(props);

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

  const submitBookToggle = (data) => {
    setPrice(data);
    book ? setBook(false) : setBook(true);
  };

  const appointment = async (e) => {
    e.preventDefault();
    navigate("/paymentform", {
      state: { date, time, items: props.data, totalPrice: price },
    });
  };

  return (
    <div
      className="subscription"
      style={{
        height: "100%",
        gridTemplateColumns: "35% 35% auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#a2b9bc",
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
          height: 450,
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
          sx={{ marginTop: "110px", marginLeft: "70px" }}
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
            <label style={{ fontWeight: "600" }}>
              Date:
              <input
                type="date"
                name="date"
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
                onChange={(e) => setTime(e.target.value)}
                style={{ marginLeft: "10px" }}
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
            bgcolor: "lavenderblush",
            boxShadow: 4,
            borderRadius: 5,
            p: 2,
            width: 350,
            marginTop: 5,
            height: 450,
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
            sx={{ marginTop: "60px", marginLeft: "70px" }}
            onClick={() => submitBookToggle(props.data.goldPlan.price)}
          >
            Choose Plan
          </Button>
        </Box>
      </div>

      <div>
        <Box
          sx={{
            bgcolor: "#E5E4E2",
            boxShadow: 4,
            borderRadius: 5,
            p: 2,
            width: 350,
            marginTop: 5,
            height: 450,
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
            sx={{ marginTop: "60px", marginLeft: "70px" }}
            onClick={() => submitBookToggle(props.data.platinumPlan.price)}
          >
            Choose Plan
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default PhotographerSubscription;
