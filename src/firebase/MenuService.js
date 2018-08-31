import { getRef } from "./common/utils";
import {
    getAllMenusRoute,
    getAllUsersRoute,
    getMenuByIdRoute
} from "./common/routes";

export const getMenuByIdRef = id => {
    return getRef(getMenuByIdRoute(id));
};

export const getMenusByCategory = category => {
    const route = getAllMenusRoute();
    return getRef(route)
        .orderByChild("category")
        .equalTo(category);
};
