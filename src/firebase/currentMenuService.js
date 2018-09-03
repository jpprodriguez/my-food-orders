import { getRef, set } from "./common/utils";
import {
    getCurrentMenuRoute,
    getCurrentMenuDatesRoute,
    getCurrentMenuRouteByDay
} from "./common/routes";

export const getCurrentMenuRef = () => {
    return getRef(getCurrentMenuRoute());
};
export const getCurrentMenuDatesRef = () => {
    return getRef(getCurrentMenuDatesRoute());
};
export const updateCurrentMenuByDay = (newCurrentMenu, day) => {
    const route = getCurrentMenuRouteByDay(day);
    return set(route, newCurrentMenu);
};
