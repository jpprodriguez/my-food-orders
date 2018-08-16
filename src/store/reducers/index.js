import { combineReducers } from "redux";
import authReducer from "./auth";
import orderReducer from "./orders";

const rootReducer = combineReducers({
    auth: authReducer,
    orders: orderReducer
});

export default rootReducer;
