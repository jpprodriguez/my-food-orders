import React, { Component } from "react";
import TabBar from "../../../components/TabBar/TabBar";
import {
    days as daysModel,
    menuCategories
} from "../../../firebase/common/models";
import OrdersPanel from "../common/OrdersPanel/OrdersPanel";
import { connect } from "react-redux";
import { objectToArrayWithKey } from "../../../utils/utils";
import { getAllUsers } from "../../../firebase/userService";
import { linkSelected, setOrders, setUsers } from "../../../store/actions";
import MenuPanel from "./MenuPanel/MenuPanel";
import { AdminMenuLinks } from "../../../utils/constants";
import UsersPanel from "./UsersPanel/UsersPanel";
import withStyles from "@material-ui/core/styles/withStyles";
import CurrentMenuPanel from "./CurrentMenuPanel/CurrentMenuPanel";

const styles = {
    root: {
        display: "flex",
        justifyContent: "center",
        paddingTop: 64
    }
};

class AdminPanel extends Component {
    componentWillMount() {
        this.props.setDrawerLink(AdminMenuLinks.MENUS);
    }
    days = daysModel;
    render() {
        const { classes } = this.props;
        const orders = this.days.map(day => (
            <OrdersPanel
                orders={this.props.orders}
                day={day}
                onInit={() => this.getUsers(true)}
            />
        ));
        const menus = Object.keys(menuCategories).map((key, index) => (
            <MenuPanel
                key={index}
                title={menuCategories[key]}
                category={menuCategories[key]}
            />
        ));
        const menuPanel = <div>{menus}</div>;
        const ordersPanel = (
            <div>
                <TabBar items={this.days} content={orders} />
            </div>
        );
        const usersPanel = (
            <UsersPanel
                onInit={() => this.getUsers(false)}
                users={this.props.users}
            />
        );
        const currentMenuPanel = <CurrentMenuPanel />;

        return (
            <div className={classes.root}>
                {this.getSectionByLink(
                    this.props.activeLink,
                    menuPanel,
                    ordersPanel,
                    usersPanel,
                    currentMenuPanel
                )}
            </div>
        );
    }
    getUsers(isForOrders) {
        getAllUsers()
            .then(snapshot => {
                if (isForOrders) {
                    this.props.setOrders(objectToArrayWithKey(snapshot.val()));
                } else {
                    this.props.setUsers(objectToArrayWithKey(snapshot.val()));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    getSectionByLink = (link, menus, orders, users, currentMenu) => {
        switch (link) {
            case AdminMenuLinks.MENUS:
                return menus;
            case AdminMenuLinks.ORDERS:
                return orders;
            case AdminMenuLinks.USERS:
                return users;
            case AdminMenuLinks.CURRENT_MENU:
                return currentMenu;
            default:
                return null;
        }
    };
}

const mapStateToProps = state => ({
    orders: state.orders.allOrders,
    users: state.userData.users,
    activeLink: state.drawer.link
});

const mapDispatchToProps = dispatch => ({
    setOrders: ordersData => dispatch(setOrders(ordersData)),
    setUsers: usersData => dispatch(setUsers(usersData)),
    setDrawerLink: link => dispatch(linkSelected(link))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AdminPanel));
