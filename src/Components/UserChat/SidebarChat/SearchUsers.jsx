import React from 'react'
import { fetchAllUsers, dispatchGetAllUser } from '../../../../../redux/actions/usersAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState } from 'react';

function UserSearchUsers() {
  const auth = useSelector(state => state.authReducer);
  const token = useSelector(state => state.token);
  const users = useSelector(state => state.users);
  const {user, isAdmin} = auth;
  const [callback, setCallBack] = React.useState(false);
  const [keyword, setkeyword] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

    const getData = async() => {
        const res = await axios.get(`/message/allUsers?search=${keyword}`, {
            headers: {
                Authorization: token
            }
        });
        setAllUsers(res.data)
        console.log(res.data)
    }

    const handleClick = async(userId) => {
        const res = await axios.post(`/message/chat`, {userId}, {
            headers: {
                Authorization: token
            }
        });
        // console.log(res)
        navigate('/admin/chat',{state: res.data._id})
    }

  const dispatch = useDispatch()
    React.useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then((res) => {
                dispatch(dispatchGetAllUser(res))
            })
        }
    }, [token, isAdmin, dispatch, callback])

  return (
    <div className='datatable'>    
        <div className="tableContainer">
            <div className="" style={{ display: 'flex', clear: 'both', alignItems: 'center', justifyContent: 'center', borderRadius: 5, padding: 10, border: '1px solid black', float: 'right', marginBottom: 10, width: 300 }}>
                <SearchIcon color='success' style={{ marginRight: 5 }} />
                <input type="text" name="search" onChange={(e) => setkeyword(e.target.value)} id="" placeholder='Search User' />
                <button className='' onClick={getData}><SearchIcon color='success' /></button>
            </div>
            <div className="" style={{  }}>
                
            </div>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            keyword ? allUsers.map((user) => (
                <tr key={user._id} >
                  <td style={{paddingLeft: 20}}>
                    <img src={user.avatar} alt="" style={{width: 30, height: 30, borderRadius: 50}} />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {
                      user.role == 1
                      ? "Admin"
                      : "User"
                    }
                  </td>
                  <td style={{paddingLeft: 30}}>
                    <ChatIcon onClick = {() => handleClick(user._id)} style = {{ cursor: 'pointer' }} />
                  </td>
                </tr>
              ))
            : users.map((user) => (
              <tr key={user._id} >
                <td style={{paddingLeft: 20}}>
                  <img src={user.avatar} alt="" style={{width: 30, height: 30, borderRadius: 50}} />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {
                    user.role == 1
                    ? "Admin"
                    : "User"
                  }
                </td>
                <td style={{paddingLeft: 30}}>
                  <ChatIcon onClick = {() => handleClick(user._id)} style = {{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
        </div>
    </div>
  )
}
export default UserSearchUsers