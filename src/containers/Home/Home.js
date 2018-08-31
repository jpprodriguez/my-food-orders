import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import { logOut } from "../../store/actions";
import SlidingDrawer from "../../components/SlidingDrawer/SlidingDrawer";
import { userTypes } from "../../firebase/common/models";
import ProviderPanel from "./ProviderPanel/ProviderPanel";
import CustomerPanel from "./CustomerPanel/CustomerPanel";
import AdminPanel from "./AdminPanel/AdminPanel";

class Home extends Component {
    state = {
        isDrawerOpen: false
    };
    getHomeContent = userType => {
        switch (userType) {
            case userTypes.admin:
                return <AdminPanel />;
            case userTypes.customer:
                return <CustomerPanel />;
            case userTypes.provider:
                return <ProviderPanel />;
            default:
                return null;
        }
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

                {this.props.userData
                    ? this.getHomeContent(this.props.userData.type)
                    : null}
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
