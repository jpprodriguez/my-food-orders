import { LINK_SELECTED } from "../actionTypes";

export const linkSelected = link => {
    return {
        type: LINK_SELECTED,
        link: link
    };
};
