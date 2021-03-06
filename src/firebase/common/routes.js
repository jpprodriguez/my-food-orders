export const getOrdersRoute = userId => routes.orders + "/" + userId;

export const getAllOrdersByDateRoute = day => routes.orders + "/" + day;

export const getOrderByDateRoute = (userId, day) =>
    routes.orders + "/" + day + "/" + userId;

export const getOrdersEditPermissionRoute = () =>
    routes.permissions + "/" + routes.permissionsRoutes.orderEdit;

export const getPermissionsRoute = () => routes.permissions;

export const getAllUsersRoute = () => routes.users;

export const getUserRoute = userId => routes.users + "/" + userId;

export const getCurrentMenuRoute = () => routes.currentMenu;

export const getCurrentMenuRouteByDay = day => routes.currentMenu + "/" + day;

export const getCurrentMenuDatesRoute = () => routes.currentMenuDates;

export const getAllMenusRoute = () => routes.allMenus;

export const getMenuByIdRoute = menuId => routes.allMenus + "/" + menuId;

const routes = {
    orders: "orders",
    permissions: "permissions",
    permissionsRoutes: {
        orderEdit: "order_edit"
    },
    users: "users",
    currentMenu: "current_menu/menu",
    currentMenuDates: "current_menu/dates",
    allMenus: "all_menus"
};
