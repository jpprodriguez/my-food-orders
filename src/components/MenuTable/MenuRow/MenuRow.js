import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import { getOrderByDateRoute } from "../../../firebase/common/routes";
import { getRef } from "../../../firebase/common/utils";
import { getMenuByIdRef } from "../../../firebase/MenuService";
import { connect } from "react-redux";
import { updateAllOrders } from "../../../store/actions";

class MenuRow extends Component {
    userRef = null;
    foodRef = null;

    componentDidMount() {
        this.userRef = getRef(
            getOrderByDateRoute(this.props.user.key, this.props.day)
        );
        this.userRef.on("value", snapshot => {
            this.handleUserOrderUpdate(snapshot.val());
        });
    }
    componentWillUnmount() {
        if (this.userRef) {
            this.userRef.off();
        }
    }
    render() {
        const { user } = this.props;
        const options = user.options
            ? user.options.map(option => <li key={option}>{option}</li>)
            : "-";
        return (
            <TableRow key={user.fileNumber}>
                <TableCell component="th" scope="row">
                    {user.name}
                </TableCell>
                <TableCell>{user.fileNumber}</TableCell>
                <TableCell>{user.food ? user.food : "-"}</TableCell>
                <TableCell>{user.category ? user.category : "-"}</TableCell>
                <TableCell>
                    <ul>{options}</ul>
                </TableCell>
            </TableRow>
        );
    }

    handleUserOrderUpdate = updatedUserOrder => {
        let newUser = { ...this.props.user };
        if (!updatedUserOrder) {
            newUser.food = null;
            newUser.category = null;
            newUser.options = null;
            this.props.updateOrderInOrders(
                this.props.orders,
                this.props.user.key,
                newUser
            );
        } else if (updatedUserOrder.id !== this.props.user.id) {
            if (this.foodRef) {
                this.foodRef.off();
            }
            this.foodRef = getMenuByIdRef(updatedUserOrder.id);
            this.foodRef.on("value", snapshot => {
                const newFood = snapshot.val();
                newUser.food = newFood.title;
                newUser.category = newFood.category;
                newUser.options = updatedUserOrder.options;
                this.props.updateOrderInOrders(
                    this.props.orders,
                    this.props.user.key,
                    newUser
                );
            });
        } else {
            newUser.options = updatedUserOrder.options;
            this.props.updateOrderInOrders(
                this.props.orders,
                this.props.user.key,
                newUser
            );
        }
    };
}

const mapStateToProps = state => ({
    orders: state.orders.allOrders
});

const mapDispatchToProps = dispatch => ({
    updateOrderInOrders: (ordersData, userId, newOrderData) =>
        dispatch(updateAllOrders(ordersData, userId, newOrderData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuRow);
