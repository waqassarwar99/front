import ACTIONS from "./index";
import axios from 'axios';

export const fetchAllUsers = async(token) => {
    const res = await axios.get('/admin/userDetails', {
        headers: {Authorization: token}
    })
    return res;
}

export const dispatchGetAllUser = (res) => {
    console.log(res)
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    }
}