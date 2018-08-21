import React, { Component } from "react";
import Divider from "@material-ui/core/Divider/Divider";
import Typography from "@material-ui/core/es/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
    getCurrentMenuDatesRef,
    getCurrentMenuRef
} from "../../firebase/currentMenuService";
import {
    currentMenuUpdated,
    currentMenuDatesUpdated
} from "../../store/actions";
import { objectToArray, objectWithKeysToArray } from "../../utils/utils";
import { days as daysModel } from "../../firebase/common/models";
import MenuPanel from "./MenuPanel/MenuPanel";

const styles = theme => ({
    root: {
        [theme.breakpoints.down("sm")]: {},
        [theme.breakpoints.up("md")]: {},
        [theme.breakpoints.up("lg")]: {},
        padding: "16px 8px 0px 8px"
    },
    titleContainer: {
        marginBottom: 8
    },
    title: {
        textAlign: "center"
    },
    panelDetails: {
        flexDirection: "column"
    },
    menuCard: {
        marginBottom: 8
    }
});

class CustomerMenu extends Component {
    currentMenuRef = null;
    currentMenuDatesRef = null;
    componentWillMount() {
        this.currentMenuRef = getCurrentMenuRef();
        this.currentMenuRef.on("value", snapshot => {
            this.props.menuUpdated(snapshot.val());
        });
        this.currentMenuDatesRef = getCurrentMenuDatesRef();
        this.currentMenuDatesRef.on("value", snapshot => {
            this.props.menuDatesUpdated(snapshot.val());
        });
    }
    componentWillUnmount() {
        if (this.currentMenuRef.hasOwnProperty("off")) {
            this.currentMenuRef.off();
        }
    }

    render() {
        const { classes } = this.props;
        const days = daysModel;
        const menuExpPanels = this.props.currentMenu
            ? days.map(
                  day =>
                      this.props.currentMenu[day] ? (
                          <MenuPanel
                              key={day}
                              day={day}
                              menues={this.props.currentMenu[day]}
                          />
                      ) : null
              )
            : null;
        const dates = this.props.dates ? (
            <Typography
                variant="title"
                color="inherit"
                className={classes.title}
            >
                Menu {new Date(this.props.dates.startDate).toLocaleDateString()}{" "}
                - {new Date(this.props.dates.endDate).toLocaleDateString()}
            </Typography>
        ) : null;
        return (
            <div className={classes.root}>
                <div className={classes.titleContainer}>
                    {dates}
                    <Divider />
                </div>
                <div>{menuExpPanels}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentMenu: state.currentMenu.currentMenu,
    dates: state.currentMenu.dates
});

const mapDispatchToProps = dispatch => ({
    menuUpdated: newMenu => dispatch(currentMenuUpdated(newMenu)),
    menuDatesUpdated: newMenu => dispatch(currentMenuDatesUpdated(newMenu))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CustomerMenu));
