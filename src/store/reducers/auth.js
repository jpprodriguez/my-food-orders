import { LOGGED_IN, LOGGED_OUT, AUTH_CHECKED } from "../actionTypes";

import { updateObject } from "../../utils/utils";

const initialState = {
    user: null,
    wasAuthChecked: false
};

const authChecked = state => updateObject(state, { wasAuthChecked: true });
const loggedIn = (state, action) => updateObject(state, { user: action.user });
const loggedOut = state => updateObject(state, { user: null });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_CHECKED:
            return authChecked(state);
        case LOGGED_IN:
            return loggedIn(state, action);
        case LOGGED_OUT:
            return loggedOut(state);

        default:
            return state;
    }
};

export default reducer;
