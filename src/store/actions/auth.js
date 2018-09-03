import firebase from "firebase/app";
import 'firebase/auth';

import {
    AUTH_FAIL,
    AUTH_START,
    LOGGED_IN,
    LOGGED_OUT,
    AUTH_CHECKED
} from "../actionTypes";
import { userLoggedOut } from "./users";

export const authStart = () => ({
    type: AUTH_START
});

const loggedOut = () => ({
    type: LOGGED_OUT
});

export const loggedIn = user => ({
    type: LOGGED_IN,
    user: user
});

export const authFail = error => ({
    type: AUTH_FAIL,
    error: error
});

export const auth = (email, password) => dispatch => {
    dispatch(authStart());
    firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(res => {
                    dispatch(loggedIn(res.user));
                })
                .catch(err => {
                    dispatch(authFail(err));
                });
        });
};

export const authChecked = () => ({
    type: AUTH_CHECKED
});

export const logOut = () => dispatch => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(userLoggedOut());
            dispatch(loggedOut());
        });
};
