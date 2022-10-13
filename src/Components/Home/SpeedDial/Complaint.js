import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { CloseOutlined, AccountCircleOutlined } from "@mui/icons-material";
const Complaint = () => {
    const [message, setMessage] = useState("");
    const [msgModal, setMsgModal] = useState(false);

  const submitMsgModalToggle = () => {
    msgModal ? setMsgModal(false) : setMsgModal(true);
  };

  return (
    <div>
      <button type="button" onClick={submitMsgModalToggle}>
        Send Message
      </button>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={msgModal}
        onClose={submitMsgModalToggle}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >
          Complain
          <CloseOutlined
            sx={{
              marginLeft: "130px",
              marginTop: "-30px",
              cursor: "pointer",
              color: "red",
            }}
            onClick={submitMsgModalToggle}
          />
        </DialogTitle>
        <Divider />
        <DialogContent
          className="submitDialog"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <textarea
            className="submitDialogTextArea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.082)",

              outline: "none",
              padding: "2rem",
              font: "300 1rem ",
            }}
          ></textarea>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            // onClick={handleSubmitMsg}
            sx={{ bgColor: "secondary.main" }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Complaint;
