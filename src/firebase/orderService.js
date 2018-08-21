import { getOrderByDateRoute, getOrdersRoute } from "./common/routes";
import { getRef, set, update } from "./common/utils";

export const createOrder = (orderData, user) => {
    const userId = user.uid || null;
    if (!orderData) {
        throw "No order data to create";
    }
    if (userId) {
        const route = getOrdersRoute(userId);
        return set(route, orderData);
    } else {
        throw "userID not found";
    }
};

export const updateOrder = (changes, user) => {
    const userId = user.uid || null;
    if (!changes) {
        throw "No data to update";
    }
    if (userId) {
        const route = getOrdersRoute(userId);
        return update(route, changes);
    } else {
        throw "userID not found";
    }
};

export const getOrderByDayRef = (day, user) => {
    const userId = user.uid || null;
    if (!day) {
        throw "No day provided";
    }
    if (userId) {
        const route = getOrderByDateRoute(userId, day);
        return getRef(route);
    } else {
        throw "userID not found";
    }
};
