import React from "react";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

export const GlobalSpinner = props => {
    return (
        <div>
            <Backdrop zIndex={100} open={true} />
            <CircularProgress size={100} />
        </div>
    );
};

export default GlobalSpinner;
