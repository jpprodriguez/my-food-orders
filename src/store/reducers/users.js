import {
    USER_RETRIEVED,
    USER_RETRIEVE_FAILED
} from "../actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
    userData: null,
    retrievalError: null
};

const userRetrieved = (state, action) => updateObject(state, { userData: action.userData, retrievalError: null });
const userRetrieveFailed = (state, action) =>
    updateObject(state, { retrievalError: action.error });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_RETRIEVED:
            return userRetrieved(state,action);
        case USER_RETRIEVE_FAILED:
            return userRetrieveFailed(state, action);
        default:
            return state;
    }
};

export default reducer;