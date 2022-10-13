import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import token from "./tokenReducer";
import users from "./userReducer";

export default combineReducers({
  authReducer,
  cartReducer,
  token,
  users,
});
