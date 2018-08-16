import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { logOut, createOrder } from "../../store/actions";
import { Order } from "../../firebase/models";

const Home = props => {
    const orders = props.order ? (
        <div>
            <p>{props.order.mondayOption}</p>
            <p>{props.order.tuesdayOption}</p>
            <p>{props.order.wednesdayOption}</p>
            <p>{props.order.thursdayOption}</p>
            <p>{props.order.fridayOption}</p>
        </div>
    ) : null;
    return (
        <div>
            <p>This is HOME</p>
            <Button
                variant="raised"
                color="primary"
                onClick={() => props.createOrder(myOrders)}
            >
                Create Order
            </Button>
            <Button
                variant="raised"
                color="primary"
                onClick={() => props.onLogout()}
            >
                Logout
            </Button>
            <p>My orders</p>
            {orders}
            <p>Error</p>
            {props.creationError ? <p>{props.creationError}</p> : null}
        </div>
    );
};

const myOrders  = new Order('menu', 'pasta', 'wfh', 'sandwich', 'menu');

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logOut()),
    createOrder: (order) => dispatch(createOrder(order))
});

const mapStateToProps = state => ({
    order: state.orders.order,
    creationError: state.orders.creationError
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
