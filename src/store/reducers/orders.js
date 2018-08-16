import { ORDER_CREATED, ORDER_CREATION_FAILED } from "../actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
    order: null,
    creationError: null
};

const orderCreated = (state) =>
    updateObject(state, { creationError: null });
const orderCreationFailed = (state, action) =>
    updateObject(state, { creationError: action.error });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_CREATED:
            return orderCreated(state);
        case ORDER_CREATION_FAILED:
            return orderCreationFailed(state, action);
        default:
            return state;
    }
};

export default reducer;
