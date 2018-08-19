import {
    CURRENT_MENU_DATES_UPDATED,
    CURRENT_MENU_UPDATED
} from "../actionTypes";

export const currentMenuUpdated = menu => {
    return {
        type: CURRENT_MENU_UPDATED,
        menu: menu
    };
};

export const currentMenuDatesUpdated = dates => {
    return {
        type: CURRENT_MENU_DATES_UPDATED,
        dates: dates
    };
};
