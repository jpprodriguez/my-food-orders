import React, { Component } from "react";
import TabBar from "../../../components/TabBar/TabBar";
import {
    days as daysModel,
    menuCategories
} from "../../../firebase/common/models";
import OrdersPanel from "../common/OrdersPanel/OrdersPanel";
import { connect } from "react-redux";
import { objectToArray, objectToArrayWithKey } from "../../../utils/utils";
import { getAllUsers } from "../../../firebase/userService";
import { linkSelected, setOrders } from "../../../store/actions";
import MenuPanel from "./MenuPanel/MenuPanel";
import { AdminMenuLinks } from "../../../utils/constants";

class AdminPanel extends Component {
    componentWillMount() {
        this.props.setDrawerLink(AdminMenuLinks.MENUS);
    }
    days = daysModel;
    render() {
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

        return (
            <div>
                {this.getSectionByLink(
                    this.props.activeLink,
                    menuPanel,
                    ordersPanel
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
                    this.props.setUsers(objectToArray(snapshot.val()));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    getSectionByLink = (link, menus, orders) => {
        switch (link) {
            case AdminMenuLinks.MENUS:
                return menus;
            case AdminMenuLinks.ORDERS:
                return orders;
            case AdminMenuLinks.USERS:
                return null;
            case AdminMenuLinks.CURRENT_MENU:
                return null;
            default:
                return null;
        }
    };
}

const mapStateToProps = state => ({
    orders: state.orders.allOrders,
    activeLink: state.drawer.link
});

const mapDispatchToProps = dispatch => ({
    setOrders: ordersData => dispatch(setOrders(ordersData)),
    setDrawerLink: link => dispatch(linkSelected(link))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPanel);
