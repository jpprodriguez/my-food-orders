import firebase from "firebase";
import { getOrderRoute } from "./routes";

export const createOrder = (orderData) => {
    const userId = firebase.auth().currentUser.uid || null;
    if(!orderData) {
        throw 'No order data to create';
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
