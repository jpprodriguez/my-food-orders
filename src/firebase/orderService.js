import { getOrderRoute } from "./common/routes";
import { set, update } from "./common/utils";

export const createOrder = (orderData, user) => {
    const userId = user.uid || null;
    if (!orderData) {
        throw "No order data to create";
    }
    if (userId) {
        const route = getOrderRoute(userId);
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
        const route = getOrderRoute(userId);
        return update(route, changes);
    } else {
        throw "userID not found";
    }
};
