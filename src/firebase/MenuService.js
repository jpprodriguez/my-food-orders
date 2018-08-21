import { getRef } from "./common/utils";
import { getMenuByIdRoute } from "./common/routes";

export const getMenuByIdRef = id => {
    return getRef(getMenuByIdRoute(id));
};
