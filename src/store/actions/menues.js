import { MENUES_UPDATED } from "../actionTypes";

export const menuesUpdated = menues => {
    return {
        type: MENUES_UPDATED,
        menues: menues
    };
};
