import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import './viewComplaints.css';

function ViewComplaints() 
{
    const history = useNavigate();
    const [cars, setCars] = React.useState([]);

    React.useEffect(() => {
        const getData = async() => {
            const res = await axios.get("/admin/viewComplaint")
            setCars(res.data)

        }
        getData();
    },[])

   const deleteComplain = async (id) => {
     const complain = await axios.delete(`/admin/deleteComplaint/${id}`);
    alert("Complaint Deleted");
     window.location.href="/admin/complaints"
   }


    return (
        <div className='datatable'>
            <h1 style={{display: "flex", justifyContent:"center", marginTop: "5px", fontFamily: "Roboto", marginBottom: "20px"}}>Complaints</h1>
            <div className="tableContainer">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Msg</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        cars ? cars.map((car) => (
                            <tr key={car._id} style = {{ cursor: 'pointer' }}>
                                <td scope="col-4">{car.user.name}</td>
                                <td scope="col-4">{car.user.email}</td>

                                <td scope="col-4">{car.msg}</td>
                                <td scope="col-4">
                                <Button variant="contained" color="error" onClick={() => deleteComplain(car._id)}><DeleteIcon color="red"/>Delete</Button>
                                </td>
                            </tr>
                    )): null
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ViewComplaints