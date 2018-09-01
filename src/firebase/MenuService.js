import { getRef, update } from "./common/utils";
import { getAllMenusRoute, getMenuByIdRoute } from "./common/routes";

export const getMenuByIdRef = id => {
    return getRef(getMenuByIdRoute(id));
};

export const getMenusByCategory = category => {
    const route = getAllMenusRoute();
    return getRef(route)
        .orderByChild("category")
        .equalTo(category);
};

export const updateMenuById = (id, changes) => {
    const route = getMenuByIdRoute(id);
    return update(route, changes);
};
