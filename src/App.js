import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import firebase from "firebase";

import Login from "./containers/Login/Login";
import "./App.css";
import { loggedIn, logOut, authChecked } from "./store/actions/auth";
import Home from "./containers/Home/Home";

class App extends Component {
    componentWillMount() {
        this.checkAuth(this);
    }

    checkAuth = self => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                self.props.logIn(user);
                console.log("THE USER IS SIGNED IN");
            } else {
                console.log("THE USER IS SIGNED OFF");
                // No user is signed in.
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
        return <div className="App">{routes}</div>;
    }
}
const mapDispatchToProps = dispatch => ({
    authChecked: () => dispatch(authChecked()),
    logOut: () => dispatch(logOut()),
    logIn: user => dispatch(loggedIn(user))
});
const mapStateToProps = state => ({
    wasAuthChecked: state.auth.wasAuthChecked,
    user: state.auth.user
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
