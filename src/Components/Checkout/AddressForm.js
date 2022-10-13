import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import Navbar from "../Home/Navbar";
import { useNavigate } from "react-router-dom";
const AddressForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhone] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 4,
            borderRadius: 5,
            p: 2,
            width: 700,
            marginTop: 5,
            height: 450,
            marginLeft: 5,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="city"
                name="city"
                label="city"
                fullWidth
                variant="standard"
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="phoneNo"
                name="phoneNo"
                label="Phone No"
                fullWidth
                variant="standard"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{ marginBottom: "-390px", marginLeft: "600px" }}
            onClick={() =>
              navigate("/paymentform", {
                state: { name, city, address, phoneNo },
              })
            }
          >
            Next
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default AddressForm;
