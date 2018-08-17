export const getOrderRoute = userId => routes.orders + "/" + userId;

export const getUserRoute = userId => routes.users + "/" + userId;

export const getCurrentMenuRoute = () => routes.currentMenu;

export const getAllMenusRoute = () => routes.allMenus;

const routes = {
    orders: "orders",
    users: "users",
    currentMenu: "current_menu",
    allMenus: "all_menus"
};
