import React from "react";
import "./seller.css";
import {
  fetchAllUsers,
  dispatchGetAllUser,
} from "../../../../redux/actions/usersAction";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Seller() {
  //seller data
  const token = localStorage.getItem("token");


  const [seller, setSeller] = React.useState([]);

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/admin/rejectSeller/${id}`);
       window.location.href = "/admin/seller";
    } catch (error) {}
  };

  const acceptSeller = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:4000/admin/accept/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res, "data");
      alert("Request Accepted");
    } catch (error) {}
  };

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/admin/viewRequests", {
        headers: {
          Authorization: token,
        },
      });
      setSeller(res.data);
      console.log(res.data);
    };
    getData();
  });

  return (
    <div className="datatable">
      <div className="tableContainer">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">CNIC</th>
              <th scope="col">Phone No</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {seller.map((user) =>
              user.status === "Not Accepted" ? (
                <tr key={user._id} style={{ cursor: "pointer" }}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cnic}</td>
                  <td>{user.phone}</td>
                  <td style={{ paddingLeft: 20 }}>
                    <img
                      src={user.avatar}
                      alt=""
                      style={{ width: 30, height: 30, borderRadius: 50 }}
                    />
                  </td>
                  <td style={{ paddingLeft: 30 }}>
                    <button
                      className="btn btn-success"
                      style={{ color: "white", marginRight: 10 }}
                      onClick={() => acceptSeller(user._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ color: "white" }}
                      onClick={() => deleteUser(user._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Seller;
