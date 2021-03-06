import React, { Component } from "react";
import Divider from "@material-ui/core/Divider/Divider";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    getCurrentMenuDatesRef,
    getCurrentMenuRef
} from "../../../firebase/currentMenuService";
import {
    currentMenuUpdated,
    currentMenuDatesUpdated
} from "../../../store/actions/index";
import { days as daysModel } from "../../../firebase/common/models";
import MenuPanel from "./MenuPanel/MenuPanel";
import TabBar from "../../../components/TabBar/TabBar";
import Snackbar, {
    SnackbarTypes
} from "../../../components/Snackbar/Snackbars";
import { CustomerMenuLinks } from "../../../utils/constants";
import { linkSelected, setOrderEditPermission } from "../../../store/actions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { getCurrentDay } from "../../../utils/utils";
import { getOrderEditPermisssionRef } from "../../../firebase/permissionsService";

const styles = theme => ({
    root: {
        padding: "16px 8px 0px 8px",
        [theme.breakpoints.up("sm")]: {
            padding: "32px 16px 0px 16px"
        },
        [theme.breakpoints.up("md")]: {
            padding: "64px 32px 0px 32px"
        },
        [theme.breakpoints.up("lg")]: {
            padding: "64px 64px 0px 64px"
        }
    },
    titleContainer: {
        marginBottom: 16,
        [theme.breakpoints.up("sm")]: {
            marginBottom: 32
        }
    },
    title: {
        textAlign: "center",
        [theme.breakpoints.up("sm")]: {
            textAlign: "left"
        }
    },
    panelDetails: {
        flexDirection: "column"
    },
    menuCard: {
        marginBottom: 8
    },
    datesContainer: {
        display: "flex",
        alignItems: "center"
    }
});

class CustomerMenu extends Component {
    currentMenuRef = null;
    currentMenuDatesRef = null;
    orderEditPermissionRef = null;
    currentDay = getCurrentDay();
    componentWillMount() {
        this.props.setDrawerLink(CustomerMenuLinks.CURRENT_MENU);
        this.currentMenuRef = getCurrentMenuRef();
        this.currentMenuRef.on("value", snapshot => {
            this.props.menuUpdated(snapshot.val());
        });
        this.currentMenuDatesRef = getCurrentMenuDatesRef();
        this.currentMenuDatesRef.on("value", snapshot => {
            this.props.menuDatesUpdated(snapshot.val());
        });
        this.orderEditPermissionRef = getOrderEditPermisssionRef();
        this.orderEditPermissionRef.on("value", snapshot => {
            this.props.setOrderEditPermission(snapshot.val());
        });
    }
    componentWillUnmount() {
        if (this.currentMenuRef) {
            this.currentMenuRef.off();
        }
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.updateStatus !== this.props.updateStatus) {
            if (!nextProps.updateStatus.wasSuccessful) {
                toast(
                    <Snackbar
                        variant={SnackbarTypes.error}
                        message={nextProps.updateStatus.errorMsg.message}
                    />
                );
            } else {
                toast(
                    <Snackbar
                        variant={SnackbarTypes.success}
                        message={"Order Succesfully Updated"}
                    />
                );
            }
            return false;
        }
        return true;
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
                              menus={this.props.currentMenu[day]}
                          />
                      ) : null
              )
            : null;
        const dates = this.props.dates ? (
            <div className={classes.datesContainer}>
                <IconButton>
                    <ArrowLeftIcon />
                </IconButton>
                <Typography
                    variant="headline"
                    color="inherit"
                    className={classes.title}
                >
                    {this.parseCurrentMenuDates(this.props.dates)}
                </Typography>
                <IconButton>
                    <ArrowRightIcon />
                </IconButton>
            </div>
        ) : null;
        return (
            <div className={classes.root}>
                <div className={classes.titleContainer}>
                    {dates}
                    <Divider />
                </div>
                <TabBar
                    items={days}
                    content={menuExpPanels}
                    initialTab={days.indexOf(this.currentDay)}
                />
            </div>
        );
    }

    parseCurrentMenuDates(dates) {
        const options = { month: "numeric", day: "numeric" };
        return (
            new Date(dates.startDate).toLocaleDateString(undefined, options) +
            " - " +
            new Date(dates.endDate).toLocaleDateString(undefined, options)
        );
    }
}

const mapStateToProps = state => ({
    currentMenu: state.currentMenu.currentMenu,
    dates: state.currentMenu.dates,
    updateStatus: state.orders.updateStatus
});

const mapDispatchToProps = dispatch => ({
    menuUpdated: newMenu => dispatch(currentMenuUpdated(newMenu)),
    menuDatesUpdated: newMenu => dispatch(currentMenuDatesUpdated(newMenu)),
    setDrawerLink: link => dispatch(linkSelected(link)),
    setOrderEditPermission: value => dispatch(setOrderEditPermission(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CustomerMenu));
