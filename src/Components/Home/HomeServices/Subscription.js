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
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#dcdcdc",
          width: "98%",
          borderRadius: "10px",
          minHeight: "580px",
        }}
      >
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "cursive",
            marginBottom: "10px",
          }}
        >
          Venues
        </h1>
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
      </div>
      <div
        style={{
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#dcdcdc",
          width: "98%",
          borderRadius: "10px",
          minHeight: "600px",
          marginTop:"20px"

        }}
      >
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "cursive",
            marginTop: "20px",
          }}
        >
          {" "}
          Menus{" "}
        </h1>
        <div
          className="subscription"
          style={{
            gridTemplateColumns: "35% 35%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginBottom:"20px"
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
                minHeight: 480,
                marginLeft: 5,
                marginBottom:"40px"
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
                  marginLeft: "30px",
                }}
                gutterBottom
              >
                PKR {data.basicPrice}{" "}
                <span style={{ fontSize: "12px" }}>(per person)</span>
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
    </div>
  );
};

export default Subscription;
