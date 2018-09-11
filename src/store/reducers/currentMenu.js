import {
    CURRENT_MENU_DATES_UPDATED,
    CURRENT_MENU_UPDATED
} from "../actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
    currentMenu: null,
    dates: null
};

const currentMenuUpdated = (state, action) =>
    updateObject(state, { currentMenu: action.menu });
const currentMenuDatesUpdated = (state, action) =>
    updateObject(state, { dates: action.dates });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_MENU_UPDATED:
            return currentMenuUpdated(state, action);
        case CURRENT_MENU_DATES_UPDATED:
            return currentMenuDatesUpdated(state, action);
        default:
            return state;
    }
};

export default reducer;
