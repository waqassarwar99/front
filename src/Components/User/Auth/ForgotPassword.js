import React from 'react';
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import EmailIcon from '@mui/icons-material/Email';
import Alert from '@mui/material/Alert';
import './forgotPassword.css'

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = React.useState(initialState);
    const {email, err, success} = data

    const [showSuccessAlert, setShowSuccessAlert] = React.useState(true);

    const closeAlert = () => {
        setShowSuccessAlert(false);
    }

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]:value, err: '', success: ''})
    }

    const forgotPassword = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/forgot', {email})
            return setData({...data, err: '', success: res.data.msg})
        } catch (error) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <div className="bodyss">
            <div className="" style={{ backgroundColor: 'white', borderRadius: 5, padding: 30, height: 300 }}>
                <form action="">
                    {success && showSuccessAlert && <Alert onClose={closeAlert}>{success}</Alert>}
                    <h5 className='forgot'>Forgot Your {"\n"} Password?</h5>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment"
                            type='email'
                            onChange={handleChangeInput}
                            name = 'email'
                            placeholder='Enter Email Address'
                            startAdornment={
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            }
                            label="Email"
                        />
                    </FormControl><br />
                    <button type='submit' className='btn btn-success' style={{ float: 'right', marginRight: 10 }} onClick={forgotPassword}>Next</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
