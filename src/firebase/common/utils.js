import firebase from "firebase/app";
import 'firebase/database';

export const getOnce = route => {
    return firebase
        .database()
        .ref(route)
        .once("value");
};

export const getRef = route => {
    return firebase.database().ref(route);
};

export const getRefChilds = route => {
    return firebase
        .database()
        .ref()
        .child(route);
};

export const set = (route, data) => {
    return firebase
        .database()
        .ref(route)
        .set(data);
};

export const update = (route, data) => {
    return firebase
        .database()
        .ref(route)
        .update(data);
};
