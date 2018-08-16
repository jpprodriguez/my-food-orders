import firebase from "firebase";

export const getOnce = route => {
    return firebase
        .database()
        .ref(route)
        .once("value");
};

export const getRef = route => {
    return firebase.database().ref(route);
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
