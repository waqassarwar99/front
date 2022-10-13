import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatcLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";
import axios from "axios";

import UserRoute from "./Components/User/UserRoute";
import AdminRouter from "./Components/Admin/AdminRouter";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.authReducer);
  const { isLogged, isAdmin } = auth;

  React.useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    const token = localStorage.getItem("token");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refreshToken", null);

        dispatch({ type: "GET_TOKEN", payload: token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  React.useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatcLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return <div>{isAdmin ? <AdminRouter /> : <UserRoute />}</div>;
}

export default App;
