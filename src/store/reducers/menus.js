import { MENUS_UPDATED } from "../actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
    menus: null
};

const menusUpdated = (state, action) =>
    updateObject(state, { menus: action.menus });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MENUS_UPDATED:
            return menusUpdated(state, action);
        default:
            return state;
    }
};

export default reducer;
