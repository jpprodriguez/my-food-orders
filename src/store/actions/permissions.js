import { SET_ORDER_EDIT_PERMISSION } from "../actionTypes";

export const setOrderEditPermission = newValue => {
    return {
        type: SET_ORDER_EDIT_PERMISSION,
        orderEdit: newValue
    };
};
