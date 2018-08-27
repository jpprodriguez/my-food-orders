import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import { getOrderByDateRoute } from "../../../firebase/common/routes";
import { getRef } from "../../../firebase/common/utils";
import { getMenuByIdRef } from "../../../firebase/MenuService";

class MenuRow extends Component {
    userRef = null;
    foodRef = null;
    state = {
        user: { ...this.props.user }
    };
    componentDidMount() {
        this.userRef = getRef(
            getOrderByDateRoute(this.state.user.key, this.props.day)
        );
        this.userRef.on("value", snapshot => {
            this.handleUserOrderUpdate(snapshot.val());
        });
    }
    componentWillUnmount() {
        console.log("ME voy");
        if (this.userRef) {
            this.userRef.off();
        }
    }
    render() {
        const { user } = this.state;
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
        if (!updatedUserOrder) {
            let newUser = { ...this.state.user };
            newUser.food = null;
            newUser.category = null;
            newUser.options = null;
            this.setState({ user: newUser });
            return;
        }
        if (updatedUserOrder.id !== this.state.user.id) {
            if (this.foodRef) {
                this.foodRef.off();
            }
            this.foodRef = getMenuByIdRef(updatedUserOrder.id);
            this.foodRef.on("value", snapshot => {
                let newUser = { ...this.state.user };
                const newFood = snapshot.val();
                newUser.food = newFood.title;
                newUser.category = newFood.category;
                newUser.options = updatedUserOrder.options;
                this.setState({ user: newUser });
            });
        } else {
            let newUser = { ...this.state.user };
            newUser.options = updatedUserOrder.options;
            this.setState({ user: newUser });
        }
    };
}

export default MenuRow;
