import firebase from "firebase";
import { getOrderRoute } from "./routes";

export const createOrder = (orderData, user) => {
    const userId = user.uid || null;
    if (!orderData) {
        throw "No order data to create";
    }
    if (userId) {
        const route = getOrderRoute(userId);
        return firebase
            .database()
            .ref(route)
            .set(orderData);
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
        return firebase
            .database()
            .ref()
            .child(route)
            .update(changes);
    } else {
        throw "userID not found";
    }
};

export const getUserOrder = () => {
    const userId = firebase.auth().currentUser.uid || null;
    if (userId) {
        return firebase
            .database()
            .ref(getOrderRoute(userId))
            .once("value");
    } else {
        throw "userID not found";
    }
};
