import { MENUS_UPDATED } from "../actionTypes";

export const menusUpdated = menus => {
    return {
        type: MENUS_UPDATED,
        menus: menus
    };
};
