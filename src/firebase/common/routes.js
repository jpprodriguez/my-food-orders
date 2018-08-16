export const getOrderRoute = userId => routes.orders + "/" + userId;

export const getUserRoute = userId => routes.users + "/" + userId;

const routes = {
    orders: "orders",
    users: "users"
};
