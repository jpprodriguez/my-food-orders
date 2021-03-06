import {
    USER_RETRIEVED,
    USER_RETRIEVE_FAILED,
    RETRIEVING_USER_DATA,
    USER_LOGGED_OUT,
    SET_USERS
} from "../actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
    users: null,
    userData: null,
    loading: null,
    retrievalError: null
};

const userRetrieved = (state, action) =>
    updateObject(state, {
        userData: action.userData,
        retrievalError: null,
        loading: false
    });
const userRetrieveFailed = (state, action) =>
    updateObject(state, { retrievalError: action.error, loading: false });
const retrievingUserData = state => updateObject(state, { loading: true });
const userLoggedOut = state =>
    updateObject(state, {
        userData: null,
        loading: false,
        retrievalError: null
    });
const setUsers = (state, action) =>
    updateObject(state, { users: action.users });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_RETRIEVED:
            return userRetrieved(state, action);
        case USER_RETRIEVE_FAILED:
            return userRetrieveFailed(state, action);
        case RETRIEVING_USER_DATA:
            return retrievingUserData(state);
        case USER_LOGGED_OUT:
            return userLoggedOut(state);
        case SET_USERS:
            return setUsers(state, action);
        default:
            return state;
    }
};

export default reducer;
