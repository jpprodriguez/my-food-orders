import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Header from "../../components/Header/Header";
import CustomerMenu from "../customerMenu/customerMenu";
import { createOrder, logOut, updateOrder } from "../../store/actions";

class Home extends Component {
    render() {
        const userData = this.props.userData ? (
            <div>
                <p>{this.props.userData.name}</p>
                <p>{this.props.userData.fileNumber}</p>
                <p>{this.props.userData.type}</p>
                <p>{this.props.userData.isVeggie.toString()}</p>
            </div>
        ) : null;

        const homeUI = (
            <div>
                <Header
                    title={"Restaurant Orders"}
                    userName={
                        this.props.userData ? this.props.userData.name : null
                    }
                    loading={this.props.userDataLoading}
                    onLogoutClick={this.props.onLogout}
                />
                <CustomerMenu
                    days={[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday"
                    ]}
                />
                <Button
                    variant="raised"
                    color="primary"
                    onClick={() =>
                        this.props.updateOrder(
                            {},
                            this.props.user
                        )
                    }
                >
                    Update Order
                </Button>
                <p>
                    <strong>My user data</strong>
                </p>
                {userData}
                <br />
            </div>
        );

        return homeUI;
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
    userData: state.userData.userData,
    userDataLoading: state.userData.loading
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
