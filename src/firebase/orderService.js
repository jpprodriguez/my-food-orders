import {
    getAllOrdersByDateRoute,
    getOrderByDateRoute,
    getOrdersRoute
} from "./common/routes";
import { getRef, getRefChilds, set, update } from "./common/utils";

export const createOrder = (orderData, user) => {
    const userId = user.uid || null;
    if (!orderData) {
        throw new Error("No order data to create");
    }
    if (userId) {
        const route = getOrdersRoute(userId);
        return set(route, orderData);
    } else {
        throw new Error("userID not found");
    }
};

export const updateOrder = (changes, user) => {
    const userId = user.uid || null;
    if (!changes) {
        throw new Error("No data to update");
    }
    if (userId) {
        const route = getOrdersRoute(userId);
        return update(route, changes);
    } else {
        throw new Error("userID not found");
    }
};

export const updateOrderFromDay = (changes, day, user) => {
    const userId = user.uid || null;
    if (!changes) {
        throw new Error("No data to update");
    }
    if (!day) {
        throw new Error("No day provided");
    }
    if (userId) {
        const route = getOrderByDateRoute(userId, day);
        return update(route, changes);
    } else {
        throw new Error("userID not found");
    }
};

export const getOrderByDayRef = (day, user) => {
    const userId = user.uid || null;
    if (!day) {
        throw new Error("No day provided");
    }
    if (userId) {
        const route = getOrderByDateRoute(userId, day);
        return getRef(route);
    } else {
        throw new Error("userID not found");
    }
};

export const getAllOrdersByDayRef = day => {
    const route = getAllOrdersByDateRoute(day);
    return getRefChilds(route);
};
