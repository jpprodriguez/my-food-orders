import {
    USER_RETRIEVED,
    USER_RETRIEVE_FAILED,
    RETRIEVING_USER_DATA,
    USER_LOGGED_OUT
} from "../actionTypes";
import { getUserData } from "../../firebase/userService";

export const retrieveUserData = user => dispatch => {
    try {
        dispatch(retrievingUserData());
        getUserData(user)
            .then(snapshot => {
                dispatch(userDataRetrieved(snapshot.val()));
            })
            .catch(err => {
                dispatch(userDataRetrieveFailed(err));
            });
    } catch (err) {
        dispatch(userDataRetrieveFailed(err));
    }
};

export const userLoggedOut = () => {
    return {
        type: USER_LOGGED_OUT
    };
};

const retrievingUserData = () => {
    return {
        type: RETRIEVING_USER_DATA
    };
};

const userDataRetrieved = userData => {
    return {
        type: USER_RETRIEVED,
        userData: userData
    };
};

const userDataRetrieveFailed = err => {
    return {
        type: USER_RETRIEVE_FAILED,
        error: err
    };
};
