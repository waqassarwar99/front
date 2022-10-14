import React from 'react'
import './user.scss'
import { fetchAllUsers, dispatchGetAllUser } from '../../../../redux/actions/usersAction';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import axios from 'axios';

function Users() {
  const auth = useSelector(state => state.authReducer);
  const token = useSelector(state => state.token);
  const users = useSelector(state => state.users);
  const {user, isAdmin} = auth;
  const [callback, setCallBack] = React.useState(false);
  const [seller, setSeller] = React.useState([]);


  const deleteUser = async(id) => {
    try {
      const res = await axios.delete(`/admin/deleteUser/${id}`, {
        headers: {Authorization: token}
      })
      alert("User Deleted");
      window.location.href="/admin/user"
    } catch (error) {
      
    }
  }

  const dispatch = useDispatch()
    React.useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then((res) => {
                dispatch(dispatchGetAllUser(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])

    React.useEffect(() => {
      const getData = async() => {
        const res = await axios.get('/admin/sellerDetails');
        setSeller(res.data)
      }
      getData()
    })

    
  return (
    <div className='datatable'>
     
        <div className="tableContainer">
       
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            users.map((users) => (
              user._id !== users._id ? <tr key={users._id} style = {{cursor: 'pointer'}}>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>
                  User
                </td>
                <td style={{paddingLeft: 30}}>
                  <Button onClick = {() => deleteUser(users._id)}><DeleteIcon color='error' /></Button>
                </td>
              </tr>: null
            ))
            }
            {
            seller.map((user) => (
              user.status === "Accepted" ? 
              <tr key={user._id} style = {{cursor: 'pointer'}}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  Seller
                </td>
                <td style={{paddingLeft: 30}}>
                  <Button onClick = {() => deleteUser(user._id)}><DeleteIcon color='error' /></Button>
                </td>
              </tr> :null
            ))
            }
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default Users