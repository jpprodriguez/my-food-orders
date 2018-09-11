import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Login from "./containers/Login/Login";
import "./App.css";
import {
    loggedIn,
    logOut,
    authChecked,
    retrieveUserData
} from "./store/actions";
import Home from "./containers/Home/Home";
import { ToastContainer } from "react-toastify";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    toast: {
        background: "transparent",
        padding: 0,
        margin: 0,
        width: "fit-content"
    }
};

class App extends Component {
    componentWillMount() {
        this.checkAuth(this);
    }

    checkAuth = self => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                self.props.logIn(user);
                self.props.getUserData(user);
            } else {
                self.props.logOut();
            }
            self.props.authChecked();
        });
    };

    render() {
        let routes = null;
        if (this.props.wasAuthChecked) {
            if (this.props.user) {
                routes = (
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Redirect to="/home" />
                    </Switch>
                );
            } else {
                routes = (
                    <Switch>
                        <Route path="/auth" component={Login} />
                        <Redirect to="/auth" />
                    </Switch>
                );
            }
        }
        return (
            <div className="App">
                {routes}
                <ToastContainer
                    toastClassName={this.props.classes.toast}
                    hideProgressBar
                    position={"bottom-left"}
                    closeButton={false}
                    autoClose={1100}
                />
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    authChecked: () => dispatch(authChecked()),
    logOut: () => dispatch(logOut()),
    logIn: user => dispatch(loggedIn(user)),
    getUserData: user => dispatch(retrieveUserData(user))
});
const mapStateToProps = state => ({
    wasAuthChecked: state.auth.wasAuthChecked,
    user: state.auth.user
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(App))
);
