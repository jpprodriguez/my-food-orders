import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import firebase from "firebase";

import Login from "./containers/Login/Login";
import "./App.css";
import {
    loggedIn,
    logOut,
    authChecked,
    orderUpdated,
    retrieveUserData
} from "./store/actions";
import Home from "./containers/Home/Home";
import { getOrderRoute } from "./firebase/common/routes";
import { getRef } from "./firebase/common/utils";

class App extends Component {
    ordersRef = null;
    componentWillMount() {
        this.checkAuth(this);
    }

    checkAuth = self => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("THE USER IS SIGNED IN");
                self.props.logIn(user);
                self.props.getUserData(user);
                this.ordersRef = getRef(getOrderRoute(user.uid));
                this.ordersRef.on("value", snapshot => {
                    self.props.orderUpdated(snapshot.val());
                });
            } else {
                console.log("THE USER IS SIGNED OFF");
                if (this.ordersRef) {
                    this.ordersRef.off();
                }
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
    logIn: user => dispatch(loggedIn(user)),
    orderUpdated: order => dispatch(orderUpdated(order)),
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
    )(App)
);
