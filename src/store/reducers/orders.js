import {
    ORDER_CREATED,
    ORDER_CREATION_FAILED,
    ORDER_UPDATED,
    ORDER_UPDATE_FAILED,
    ORDER_UPDATE_SUCCESS,
    SET_ORDERS,
    UPDATE_ORDER_IN_ORDERS
} from "../actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
    order: null,
    allOrders: null,
    creationError: null,
    updateStatus: null
};

const orderCreated = state => updateObject(state, { creationError: null });
const orderCreationFailed = (state, action) =>
    updateObject(state, { creationError: action.error });
const orderUpdateFailed = (state, action) =>
    updateObject(state, {
        updateStatus: { wasSuccessful: false, errorMsg: action.error }
    });
const orderUpdateSuccess = state =>
    updateObject(state, {
        updateStatus: { wasSuccessful: true, errorMsg: null }
    });
const orderUpdated = (state, action) =>
    updateObject(state, { order: action.order });
const allOrdersUpdated = (state, action) =>
    updateObject(state, { allOrders: action.orders });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_CREATED:
            return orderCreated(state);
        case ORDER_CREATION_FAILED:
            return orderCreationFailed(state, action);
        case ORDER_UPDATED:
            return orderUpdated(state, action);
        case ORDER_UPDATE_SUCCESS:
            return orderUpdateSuccess(state);
        case ORDER_UPDATE_FAILED:
            return orderUpdateFailed(state, action);
        case SET_ORDERS:
            return allOrdersUpdated(state, action);
        case UPDATE_ORDER_IN_ORDERS:
            return allOrdersUpdated(state, action);
        default:
            return state;
    }
};

export default reducer;
