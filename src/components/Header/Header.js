import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth/withWidth";

const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    spinner: {
        color: "white"
    },
    userNameContainer: {
        marginRight: 16,
        minWidth: 128,
        textAlign: "center"
    }
};

function ButtonAppBar(props) {
    const { classes } = props;

    const userName = !props.loading ? (
        <Typography
            variant={isWidthUp("sm", props.width) ? "subheading" : "body1"}
            color="inherit"
        >
            {props.userName}
        </Typography>
    ) : (
        <CircularProgress className={classes.spinner} size={20} />
    );
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Hidden>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={() => props.onMenuClick()}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography
                        variant={
                            isWidthUp("sm", props.width)
                                ? "title"
                                : "subheading"
                        }
                        color="inherit"
                        className={classes.flex}
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        variant={
                            isWidthUp("sm", props.width)
                                ? "title"
                                : "subheading"
                        }
                        color="inherit"
                        className={classes.flex}
                    >
                        {props.sectionTitle}
                    </Typography>

                    <div className={classes.userNameContainer}>{userName}</div>
                    <Hidden smDown>
                        <Button
                            color="inherit"
                            onClick={() => props.onLogoutClick()}
                        >
                            Logout
                        </Button>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(ButtonAppBar));
