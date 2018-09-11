import { getRef, getRefChilds, set, update } from "./common/utils";
import { getAllMenusRoute, getMenuByIdRoute } from "./common/routes";

export const getMenuByIdRef = id => {
    return getRef(getMenuByIdRoute(id));
};

export const getMenus = () => {
    const route = getAllMenusRoute();
    return getRef(route);
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

export const createMenu = menuData => {
    const route = getAllMenusRoute();
    const newMenuKey = getRefChilds(route).push().key;
    const newRoute = route + "/" + newMenuKey;
    return set(newRoute, menuData);
};

export const deleteMenu = id => {
    return getMenuByIdRef(id).remove();
};
