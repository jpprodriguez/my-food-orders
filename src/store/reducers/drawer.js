import { LINK_SELECTED } from "../actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
    link: null
};

const linkUpdated = (state, action) =>
    updateObject(state, { link: action.link });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LINK_SELECTED:
            return linkUpdated(state, action);
        default:
            return state;
    }
};

export default reducer;
