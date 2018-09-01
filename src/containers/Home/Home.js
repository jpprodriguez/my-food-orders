import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import { linkSelected, logOut } from "../../store/actions";
import SlidingDrawer from "../../components/SlidingDrawer/SlidingDrawer";
import { userTypes } from "../../firebase/common/models";
import ProviderPanel from "./ProviderPanel/ProviderPanel";
import CustomerPanel from "./CustomerPanel/CustomerPanel";
import AdminPanel from "./AdminPanel/AdminPanel";
import { MenuLinks } from "../../utils/constants";

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
                    sectionTitle={this.props.currentLink}
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
                    menuLinks={
                        this.props.userData
                            ? this.getMenuLinks(this.props.userData.type)
                            : null
                    }
                    onLinkClicked={link => this.handleDrawerLinkClick(link)}
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

    getMenuLinks = userType => {
        switch (userType) {
            case userTypes.provider:
                return null;
            case userTypes.customer:
                return null;
            case userTypes.admin:
                // return ['Menus', 'Current Menu', 'Orders', 'Users'];
                return MenuLinks.admin;
            default:
                return null;
        }
    };
    handleDrawerLinkClick = link => {
        this.props.setDrawerLink(link);
    };
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logOut()),
    setDrawerLink: link => dispatch(linkSelected(link))
});

const mapStateToProps = state => ({
    userData: state.userData.userData,
    userDataLoading: state.userData.loading,
    currentLink: state.drawer.link
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
