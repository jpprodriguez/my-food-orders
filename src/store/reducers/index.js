import { combineReducers } from "redux";
import authReducer from "./auth";
import orderReducer from "./orders";
import userReducer from "./users";
import currentMenuReducer from "./currentMenu";

const rootReducer = combineReducers({
    auth: authReducer,
    orders: orderReducer,
    userData: userReducer,
    currentMenu: currentMenuReducer
});

export default rootReducer;
