import {
    ORDER_CREATED,
    ORDER_CREATION_FAILED,
    ORDER_UPDATED,
    ORDER_UPDATE_FAILED,
    ORDER_UPDATE_SUCCESS
} from "../actionTypes";
import {
    createOrder as createOrderInFirebase,
    updateOrder as updateOrderInFirebase
} from "../../firebase/orderService";

export const createOrder = (orderData, user) => dispatch => {
    try {
        createOrderInFirebase(orderData, user)
            .then(() => {
                dispatch(orderCreated());
            })
            .catch(err => {
                dispatch(orderCreationFailed(err.message));
            });
    } catch (err) {
        dispatch(orderCreationFailed(err));
    }
};

export const updateOrder = (changes, user) => dispatch => {
    try {
        updateOrderInFirebase(changes, user)
            .then(() => {
                dispatch(orderUpdateSuccess());
            })
            .catch(err => {
                dispatch(orderUpdateFailed(err));
            });
    } catch (err) {
        dispatch(orderUpdateFailed(err));
    }
};

const orderCreated = () => {
    return {
        type: ORDER_CREATED
    };
};

const orderUpdateFailed = err => {
    return {
        type: ORDER_UPDATE_FAILED,
        error: err
    };
};

const orderCreationFailed = err => {
    return {
        type: ORDER_CREATION_FAILED,
        error: err
    };
};
export const orderUpdateSuccess = () => {
    return {
        type: ORDER_UPDATE_SUCCESS
    };
};
export const orderUpdated = order => {
    return {
        type: ORDER_UPDATED,
        order: order
    };
};
