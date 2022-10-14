import React from 'react'
import Avatar from '@mui/material/Avatar';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import './chats.css';

const initialState = {
    sender: '',
    receiver: '',
    message: '',
    received: '',
    timeStamp: '',
    err: '',
    success: ''
  }

function Chats() {
    const [values, setUser] = React.useState(initialState);
    const { message, err } = values;
    const [messages, setMessage] = React.useState([]);

    const auth = useSelector(state => state.authReducer)
    const { user } = auth;
    const token = useSelector(state => state.token);

    const [chat, setChat] = React.useState([]);


    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUser({...values, [name]:value, err: '', success: ''})
    } 

    const location = useLocation();
    const chatId = location.state;

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/message/sendMessage', {
                content: message, chatId
            }, 
            {
                headers: 
                {
                    Authorization: token
                }
            })
            setUser({...values, err: '', success: res.data.msg})
        } catch (error) {
            err.response.data.msg && setUser({...values, err: err.response.data.msg, success: ''})
        }
    }

    React.useEffect(() => {
        const getData = async() => {
            const res = await axios.get('/message/getChat', {
                headers: {
                    Authorization: token
                }
            });
            setChat(res.data);
        }
        getData();
    }, [message])

    React.useEffect(() => {
        const getData = async() => {
            const res = await axios.post(`/message/getMessage`, {chatId}, {
                headers: {
                    Authorization: token
                }
            })
            setMessage(res.data)
        }
        getData();
    })
    return (
    <>
        {user ? <div className='chatss'>
        <div className="caht_header">
            {chat.map((chat) => (
                chat._id == chatId ?
                chat.user.map(user => (
                    user._id == "6324909b42ab3898a89322d8" ? null :
                    <div key={user._id} style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar src={user.avatar}/>
                        <div className="chatHeader_info">
                            <h3>{user.name}</h3>
                        </div>
                    </div>
                ))
            : null))}
        </div>

        <div className="chat-body">
            {
                messages.map((message) => (
                    <p className= {message.sender._id == user._id ? 'chatMessage chatReceiver' : 'chatMessage'}>
                        <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar src={message.sender._id == user._id ? user.avatar : message.sender.avatar} style={{width: 25, height: 25, marginRight: 10}}/>
                            <div className="" style={{ backgroundColor : message.sender._id == user._id ? '#128c7e' : '#ece5dd', padding: 10, color: message.sender._id == user._id ? 'white' : 'black', borderRadius: 25, paddingLeft: 10, paddingRight: 10 }}>
                                {message.content}
                            </div>
                        </div>
                        <div className="" style={{ fontSize: 9, float: message.sender._id == user._id ? 'right' : 'left', color: 'black', marginTop: 5 }}>
                            {format(message.createdAt)}
                        </div>
                    </p>
                ))
            }
        </div>

        <div className="chat_footer">
            
            <input type="text" name='message' placeholder='Type Message' value={message} onChange={handleChangeInput} style = {{border: 'none'}} />
            <SendOutlinedIcon onClick={handleSubmit} style = {{cursor: 'pointer'}}/>
            
        </div>
    </div> : null}
    </>
  )
}

export default Chats