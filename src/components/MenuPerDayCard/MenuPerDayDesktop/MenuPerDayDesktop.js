import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";

const style = {
    root: {
        display: "flex",
        flexWrap: "wrap",
        padding: "24px",
        marginBottom: "64px"
    },
    title: {
        textTransform: "capitalize",
        width: "100%",
        marginBottom: "16px"
    }
};
const MenuPerDayDesktop = props => {
    const { classes } = props;
    return (
        <Paper className={classes.root}>
            <Typography
                className={classes.title}
                component={"h3"}
                variant={"title"}
            >
                {props.day}
            </Typography>
            {props.children}
        </Paper>
    );
};

export default withStyles(style)(MenuPerDayDesktop);
