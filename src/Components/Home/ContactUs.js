import React from "react";
import contact from "../../images/contact.jpg";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
const ContactUs = () => {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div
        className="illustration"
        style={{
          display: "flex",
          
          marginTop: "30px",
          width: "90%",
         
        }}
      >
        <img
          src={contact}
          alt="contactus"
          style={{ width: "650px", height: "650px", marginLeft: "20px",marginRight:"30px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px",
            width: "40%",
          }}
        >
          <h1
            style={{
              fontFamily: "cursive",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            Contact Us
          </h1>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{ marginBottom: "60px" }}
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ marginBottom: "60px" }}
            inputProps={{ maxLength: 40 }}
          />
          <TextField id="outlined-basic" label="Message" multiline maxRows={4}  variant="outlined" inputProps={{ maxLength: 150 }}/>
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: "60px", padding:"13px", fontWeight:"700" }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
