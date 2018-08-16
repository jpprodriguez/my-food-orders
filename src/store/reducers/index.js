import { combineReducers } from "redux";
import authReducer from "./auth";
import orderReducer from "./orders";
import userReducer from "./users";

const rootReducer = combineReducers({
    auth: authReducer,
    orders: orderReducer,
    userData: userReducer
});

export default rootReducer;
