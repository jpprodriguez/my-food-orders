import { ORDER_CREATED, ORDER_CREATION_FAILED } from "../actionTypes";
import { createOrder as createOrderInFirebase } from "../../firebase/orderService";

export const createOrder = orderData => dispatch => {
    try {
        createOrderInFirebase(orderData)
            .then(() => {
                dispatch(orderCreated());
            })
            .catch(err => {
                dispatch(orderCreationFailed(err.message));
            });
    } catch(err) {
        dispatch(orderCreationFailed(err));
    };
};

const orderCreated = () => {
    return {
        type: ORDER_CREATED
    };
};

const orderCreationFailed = err => {
    return {
        type: ORDER_CREATION_FAILED,
        error: err
    };
};
