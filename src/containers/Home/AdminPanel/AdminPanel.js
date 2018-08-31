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
import { setOrders } from "../../../store/actions";
import MenuPanel from "./MenuPanel/MenuPanel";

class AdminPanel extends Component {
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
                <TabBar
                    items={links}
                    content={[menuPanel, null, ordersPanel, null]}
                />
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
}

const links = ["Menues", "Current Menu", "Orders", "Users"];

const mapStateToProps = state => ({
    orders: state.orders.allOrders
});

const mapDispatchToProps = dispatch => ({
    setOrders: ordersData => dispatch(setOrders(ordersData))
    // setUsers: usersData => dispatch(setUsers(usersData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPanel);
