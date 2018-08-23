import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
    root: {
        flexGrow: 1,
        padding: "200px",
        boxShadow:
            "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
    }
};

function LinearQuery(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <LinearProgress variant="query" />
            <br />
            <LinearProgress color="secondary" variant="query" />
        </div>
    );
}

LinearQuery.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LinearQuery);
