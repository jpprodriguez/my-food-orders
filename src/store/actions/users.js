import { USER_RETRIEVED, USER_RETRIEVE_FAILED } from "../actionTypes";
import {getUserData} from "../../firebase/userService";

export const retrieveUserData = user => dispatch => {
    try {
        getUserData(user)
            .then((snapshot) => {
                dispatch(userDataRetrieved(snapshot.val()));
            })
            .catch(err => {
                dispatch(userDataRetrieveFailed(err));
            });
    } catch (err) {
        dispatch(userDataRetrieveFailed(err));
    }
};

const userDataRetrieved = (userData) => {
    return {
        type: USER_RETRIEVED,
        userData: userData
    };
};

const userDataRetrieveFailed = (err) => {
    return {
        type: USER_RETRIEVE_FAILED,
        error: err
    };
};
