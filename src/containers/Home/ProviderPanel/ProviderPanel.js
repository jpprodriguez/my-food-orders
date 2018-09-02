import React, { Component } from "react";
import { days as daysModel } from "../../../firebase/common/models";
import TabBar from "../../../components/TabBar/TabBar";
import { connect } from "react-redux";
import { objectToArrayWithKey } from "../../../utils/utils";
import withStyles from "@material-ui/core/styles/withStyles";
import { getAllUsers } from "../../../firebase/userService";
import OrdersPanel from "../common/OrdersPanel/OrdersPanel";
import { setOrders } from "../../../store/actions";

const styles = {
    root: {}
};

class ProviderMenu extends Component {
    days = daysModel;
    state = {
        users: null
    };
    componentDidMount() {
        getAllUsers()
            .then(snapshot => {
                this.props.setOrders(objectToArrayWithKey(snapshot.val()));
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        const orderPanels = this.props.orders
            ? this.days.map(day => (
                  <OrdersPanel orders={this.props.orders} day={day} />
              ))
            : null;
        return (
            <div>
                <TabBar items={this.days} content={orderPanels} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.orders.allOrders
});

const mapDispatchToProps = dispatch => ({
    setOrders: ordersData => dispatch(setOrders(ordersData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ProviderMenu));
