import {
    ORDER_CREATED,
    ORDER_CREATION_FAILED,
    ORDER_UPDATED,
    ORDER_UPDATE_FAILED,
    ORDER_UPDATE_SUCCESS,
    UPDATE_ORDER_IN_ORDERS,
    SET_ORDERS
} from "../actionTypes";
import {
    createOrder as createOrderInFirebase,
    updateOrder as updateOrderInFirebase,
    updateOrderFromDay as updateOrderFromDayInFirebase
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

export const updateOrderFromDay = (changes, day, user) => dispatch => {
    try {
        updateOrderFromDayInFirebase(changes, day, user)
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

export const setOrders = ordersData => {
    return {
        type: SET_ORDERS,
        orders: ordersData
    };
};

export const updateAllOrders = (ordersData, userId, newOrderData) => {
    const newOrdersData = [...ordersData];
    const indexOfDataToUpdate = newOrdersData.map(e => e.key).indexOf(userId);
    newOrdersData[indexOfDataToUpdate] = newOrderData;

    return {
        type: UPDATE_ORDER_IN_ORDERS,
        orders: newOrdersData
    };
};
