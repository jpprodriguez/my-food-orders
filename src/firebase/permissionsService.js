import {
    getOrdersEditPermissionRoute,
    getPermissionsRoute
} from "./common/routes";
import { getRef, update } from "./common/utils";
import { permissions } from "./common/models";

export const updateOrderEditPermission = newValue => {
    const route = getPermissionsRoute();
    return update(route, { [permissions.orderEdit]: newValue });
};

export const getOrderEditPermisssionRef = () => {
    const route = getOrdersEditPermissionRoute();
    return getRef(route);
};
