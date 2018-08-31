import { MENUES_UPDATED } from "../actionTypes";
import { updateObject } from "../../utils/utils";

const initialState = {
    menues: null
};

const menuesUpdated = (state, action) =>
    updateObject(state, { menues: action.menues });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MENUES_UPDATED:
            return menuesUpdated(state, action);
        default:
            return state;
    }
};

export default reducer;
