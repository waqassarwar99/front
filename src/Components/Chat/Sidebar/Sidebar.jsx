import React from 'react'
import './sideBar.scss'
import Avatar from '@mui/material/Avatar';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import SideBarChat from './SideBarChat';
import axios from 'axios';

const initialState = {
    sender: '',
    receiver: '',
    message: '',
    received: '',
    timeStamp: '',
    err: '',
    success: ''
  }

function Sidebar() {
    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.token);
    const users = useSelector(state => state.users);
    const [messages, setMessage] = React.useState([]);
    const [callback, setCallBack] = React.useState(false);
    const {user, isLogged} = auth;
    const {isAdmin} = auth;

    const [values, setUser] = React.useState(initialState);
    const {sender, receiver, message, received, err, success} = values;

    const handleChangeInput = e => {
        const {name, value} = e.target;
        console.log(name, value)
        setUser({...values, [name]:value, err: '', success: ''})
    } 

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/message/new', {
                sender: user._id, receiver: users._id, message, received: false, Hours: new Date().getHours(), Minutes: new Date().getMinutes()
            })
            setUser({...values, err: '', success: res.data.msg})
            const resp = await axios.patch(`/user/updateMessage/${users._id}`)
        } catch (error) {
            err.response.data.msg && setUser({...values, err: err.response.data.msg, success: ''})
        }
    }
  return (
    <div className='sidebars'>
        <div className="sidebar_header">
            {/* <Avatar src={user.avatar}/> */}
            <p>{user.fName}</p>
            <div className="header_right">
                <IconButton >
                    <DonutLargeIcon style={{ color: 'white' }} />
                </IconButton>
                <IconButton>
                    <ChatIcon style={{ color: 'white' }} />
                </IconButton>
                <IconButton>
                    <MoreVertIcon style={{ color: 'white' }} />
                </IconButton>
            </div>
        </div>
        <div className="sidebar_search">
            <div className="sideBar_SearchContainer">
                <SearchOutlinedIcon className='searchIcon ml-5'/>
                <input type="text" name='keyword' placeholder='Search or start a new chat' onChange={handleChangeInput}/>
            </div>
        </div>
        <div className="sidebar_chat">
            <SideBarChat />
        </div>
    </div>
  )
}

export default Sidebar