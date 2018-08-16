import {
    ORDER_CREATED,
    ORDER_CREATION_FAILED,
    ORDER_UPDATED,
    ORDER_UPDATE_FAILED,
    ORDER_UPDATE_SUCCESS
} from "../actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
    order: null,
    creationError: null,
    updateError: null
};

const orderCreated = state => updateObject(state, { creationError: null });
const orderCreationFailed = (state, action) =>
    updateObject(state, { creationError: action.error });
const orderUpdateFailed = (state, action) =>
    updateObject(state, { updateError: action.error });
const orderUpdateSuccess = state => updateObject(state, { updateError: null });
const orderUpdated = (state, action) =>
    updateObject(state, { order: action.order });

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
        default:
            return state;
    }
};

export default reducer;
