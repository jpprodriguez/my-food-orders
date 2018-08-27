import {getAllUsersRoute, getUserRoute} from "./common/routes";
import {getOnce, getRef} from "./common/utils";

export const getUserData = user => {
    const userId = user.uid || null;

    if (userId) {
        const route = getUserRoute(userId);
        return getOnce(route);
    } else {
        throw "userID not found";
    }
};

export const getAllUsers = () => {
    const route = getAllUsersRoute();
    return getRef(route).orderByChild('type')
        .equalTo('customer').once('value');
}
