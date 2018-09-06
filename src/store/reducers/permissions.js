import { SET_ORDER_EDIT_PERMISSION } from "../actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
    orderEdit: null
};

const updateOrderEdit = (state, action) =>
    updateObject(state, { orderEdit: action.orderEdit });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_EDIT_PERMISSION:
            return updateOrderEdit(state, action);
        default:
            return state;
    }
};

export default reducer;
