export const getOrderRoute = userId => routes.orders + "/" + userId;

export const getUserRoute = userId => routes.users + "/" + userId;

export const getCurrentMenuRoute = () => routes.currentMenu;

export const getCurrentMenuDatesRoute = () => routes.currentMenuDates;

export const getAllMenusRoute = () => routes.allMenus;

export const getMenuByIdRoute = menuId => routes.allMenus + "/" + menuId;

const routes = {
    orders: "orders",
    users: "users",
    currentMenu: "current_menu/menu",
    currentMenuDates: "current_menu/dates",
    allMenus: "all_menus"
};
