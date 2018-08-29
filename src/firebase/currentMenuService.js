import { getRef } from "./common/utils";
import {
    getCurrentMenuRoute,
    getCurrentMenuDatesRoute
} from "./common/routes";

export const getCurrentMenuRef = () => {
    return getRef(getCurrentMenuRoute());
};
export const getCurrentMenuDatesRef = () => {
    return getRef(getCurrentMenuDatesRoute());
};
