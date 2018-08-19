import { getRef } from "./common/utils";
import {
    getCurrentMenuRoute,
    getCurrentMenuDatesRoute,
    getMenuByIdRoute
} from "./common/routes";

export const getCurrentMenuRef = () => {
    return getRef(getCurrentMenuRoute());
};
export const getCurrentMenuDatesRef = () => {
    return getRef(getCurrentMenuDatesRoute());
};
