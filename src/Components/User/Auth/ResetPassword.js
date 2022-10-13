import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const {token} = useParams();
    const [data, setData] = React.useState(initialState)
    const {password, cf_password, err, success} = data;

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]:value, err: '', success: ''})
    }

    const resetPassword = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })
            return setData({...data, err: '', success: res.data.msg})
        } catch (error) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <div className='container w-50 mt-5 border p-5'>
            <h2 className='text-center m-3'>Reset Password</h2>
            <div>
                {/* {err && showErrMsg(err)}
                {success && showSuccessMsg(success)} */}

                <label className='mb-3' htmlFor='password'>Enter Password</label>
                <input className='form-control' type="text" name="password" id="password" placeholder='Enter password' value={password} onChange={handleChangeInput} />

                <label className='mb-3' htmlFor='cf_password'>Confirm Password</label>
                <input className='form-control' type="text" name="cf_password" id="cf_password" placeholder='Enter cf_password' value={cf_password} onChange={handleChangeInput} />

                <div className='text-center mt-3'>
                <button className='btn btn-success' onClick={resetPassword}>Reset Password</button>
                </div>
            </div>
        </div>

        // <div className="body">
        //     <div className="containers">
        //         <div className="overlay-container">
        //             <div className="overlay">
        //                 <div className="overlay-panel overlay-right">
                            
        //                 </div>
        //             </div>
        //         </div>
        //     <div className="form-container sign-up-container">
        //         <form action="">
        //             {success && <Alert >{success}</Alert>}
        //             <h1 className='forgot'>Reset Password</h1>
        //             <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        //                 <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        //                 <OutlinedInput
        //                     id="outlined-adornment-password"
        //                     type={values.showPassword ? 'text' : 'password'}
        //                     // value={user.password}
        //                     onChange={handleChangeInput}
        //                     name = 'password'
        //                     endAdornment={
        //                         <InputAdornment position="start">
        //                             <IconButton
        //                                 aria-label="toggle password visibility"
        //                                 onClick={handleClickShowPassword}
        //                                 onMouseDown={handleMouseDownPassword}
        //                                 edge="end"
        //                             >
        //                                 {values.showPassword ? <VisibilityOff /> : <Visibility />}
        //                             </IconButton>
        //                         </InputAdornment>
        //                     }
        //                     startAdornment={
        //                         <InputAdornment position="start">
        //                             <LockIcon />
        //                         </InputAdornment>
        //                     }
        //                     label="Password"
        //                 />
        //             </FormControl>
        //             <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        //                 <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
        //                 <OutlinedInput
        //                     id="outlined-adornment-password"
        //                     type={values.showPassword ? 'text' : 'password'}
        //                     // value={user.password}
        //                     onChange={handleChangeInput}
        //                     name="cf_password"
        //                     endAdornment={
        //                         <InputAdornment position="start">
        //                             <IconButton
        //                                 aria-label="toggle password visibility"
        //                                 onClick={handleClickShowPassword}
        //                                 onMouseDown={handleMouseDownPassword}
        //                                 edge="end"
        //                             >
        //                                 {values.showPassword ? <VisibilityOff /> : <Visibility />}
        //                             </IconButton>
        //                         </InputAdornment>
        //                     }
        //                     startAdornment={
        //                         <InputAdornment position="start">
        //                             <LockIcon />
        //                         </InputAdornment>
        //                     }
        //                     label="Confirm Password"
        //                 />
        //             </FormControl>
        //             <button type='submit' onClick={resetPassword}>Submit</button>
        //         </form>
        //     </div>
        // </div>
        // </div>
    )
}

export default ResetPassword
