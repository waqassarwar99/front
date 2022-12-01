import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import { FileDownloadDone } from "@mui/icons-material";


import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Subscription = (props) => {

  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/order/orders");
      setOrder(res.data);
    };
    getData();
  }, []);

  return (
    <div style={{ marginLeft: "20px", marginTop: "40px" }}>
      <h2 style={{ fontFamily: "cursive", marginBottom: "20px" }}>Venues</h2>
      <div
        className="subscription"
        style={{
          gridTemplateColumns: "35% 35% auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {props.data.goldPlan.map((data) => (
          <Box
            key={data._id}
            sx={{
              bgcolor: "background.paper",
              boxShadow: 4,
              borderRadius: 5,
              p: 2,
              width: 350,
              marginTop: 5,
              minHeight: 450,
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
              {data.venueName}
            </Typography>
            <br />

            <Divider />
            {data.addonsList.map((arr) => (
              <Stack mt={4} direction="row" gap={2}>
                <FileDownloadDone />
                <Typography variant="body1">
                  {arr.addOns} (PKR {arr.addOnsPrice})
                </Typography>
              </Stack>
            ))}
          </Box>
        ))}
      </div>

      <h2 style={{ fontFamily: "cursive", marginTop: "20px" }}> Menus </h2>
      <div
        className="subscription"
        style={{
          gridTemplateColumns: "35% 35%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {props.data.basicPlan.map((data, index) => (
          <Box
            key={data._id}
            sx={{
              bgcolor: "background.paper",
              boxShadow: 4,
              borderRadius: 5,
              p: 2,
              width: 350,
              marginTop: 5,
              minHeight: 450,
              marginLeft: 5,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontFamily: "Dancing Script",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Menu {index + 1}
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
              PKR {data.basicPrice}
            </Typography>

            <Divider />
            {data.basicService.split(",").map((arr) => (
              <Stack mt={4} direction="row" gap={2}>
                <FileDownloadDone />
                <Typography variant="body1">{arr}</Typography>
              </Stack>
            ))}
          </Box>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
