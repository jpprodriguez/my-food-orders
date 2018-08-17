import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { logOut, createOrder, updateOrder } from "../../store/actions";
import { Order } from "../../firebase/common/models";

class Home extends Component {
    render() {
        const mockOrder = new Order("menu", "pasta", "wfh", "sandwich", "menu");
        const userData = this.props.userData ? (
            <div>
                <p>{this.props.userData.name}</p>
                <p>{this.props.userData.fileNumber}</p>
                <p>{this.props.userData.type}</p>
                <p>{this.props.userData.isVeggie.toString()}</p>
            </div>
        ) : null;
        const orders = this.props.order ? (
            <div>
                <p>Lunes: {this.props.order.mondayOption}</p>
                <p>Martes: {this.props.order.tuesdayOption}</p>
                <p>Miercoles: {this.props.order.wednesdayOption}</p>
                <p>Jueves: {this.props.order.thursdayOption}</p>
                <p>Viernes: {this.props.order.fridayOption}</p>
            </div>
        ) : null;
        return (
            <div>
                <p>This is HOME</p>
                <Button
                    variant="raised"
                    color="primary"
                    onClick={() =>
                        this.props.createOrder(mockOrder, this.props.user)
                    }
                >
                    Create Order
                </Button>
                <Button
                    variant="raised"
                    color="primary"
                    onClick={() =>
                        this.props.updateOrder(
                            { mondayOption: "wfh" },
                            this.props.user
                        )
                    }
                >
                    Update Order
                </Button>
                <Button
                    variant="raised"
                    color="primary"
                    onClick={() => this.props.onLogout()}
                >
                    Logout
                </Button>
                <p><strong>My user data</strong></p>
                {userData}
                <br/>
                <p><strong>My orders</strong></p>
                {orders}
                {/*<p>Error</p>*/}
                {/*{this.props.creationError ? (*/}
                    {/*<p>{this.props.creationError}</p>*/}
                {/*) : null}*/}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logOut()),
    createOrder: (order, user) => dispatch(createOrder(order, user)),
    updateOrder: (order, user) => dispatch(updateOrder(order, user))
});

const mapStateToProps = state => ({
    order: state.orders.order,
    creationError: state.orders.creationError,
    user: state.auth.user,
    userData: state.userData.userData
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
