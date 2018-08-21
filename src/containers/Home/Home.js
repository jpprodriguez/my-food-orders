import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import CustomerMenu from "../customerMenu/customerMenu";
import { logOut } from "../../store/actions";
import SlidingDrawer from "../../components/SlidingDrawer/SlidingDrawer";

class Home extends Component {
    state = {
        isDrawerOpen: false
    };
    render() {
        const homeUI = (
            <div>
                <Header
                    title={"Restaurant Orders"}
                    userName={
                        this.props.userData ? this.props.userData.name : null
                    }
                    loading={this.props.userDataLoading}
                    onMenuClick={() => this.menuClickHandler()}
                    onLogoutClick={this.props.onLogout}
                />
                <SlidingDrawer
                    isDrawerOpen={this.state.isDrawerOpen}
                    onDrawerClose={() => {
                        this.setState({ isDrawerOpen: false });
                    }}
                    onLogout={this.props.onLogout}
                />
                <CustomerMenu />
            </div>
        );

        return homeUI;
    }

    menuClickHandler = () => {
        this.setState(state => ({ isDrawerOpen: !state.isDrawerOpen }));
    };
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
