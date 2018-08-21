import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Header from "../../components/Header/Header";
import CustomerMenu from "../customerMenu/customerMenu";
import { createOrder, logOut, updateOrder } from "../../store/actions";

class Home extends Component {
    render() {
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
                <CustomerMenu/>
            </div>
        );

        return homeUI;
    }
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logOut())
});

const mapStateToProps = state => ({
    userData: state.userData.userData,
    userDataLoading: state.userData.loading
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
