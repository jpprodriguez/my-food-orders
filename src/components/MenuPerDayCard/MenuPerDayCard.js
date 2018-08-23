import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";

const style = {
    root: {
        display: "flex",
        flexWrap: "wrap",
        padding: "24px",
        marginBottom: "64px",
        backgroundColor: "transparent"
    },
    title: {
        textTransform: "capitalize",
        width: "100%",
        marginBottom: "16px"
    }
};
const MenuPerDayCard = props => {
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

export default withStyles(style)(MenuPerDayCard);
