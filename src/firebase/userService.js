import { getUserRoute } from "./common/routes";
import { getOnce } from "./common/utils";

export const getUserData = user => {
    const userId = user.uid || null;

    if (userId) {
        const route = getUserRoute(userId);
        return getOnce(route);
    } else {
        throw "userID not found";
    }
};
