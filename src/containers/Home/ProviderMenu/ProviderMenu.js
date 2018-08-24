import React, { Component } from "react";
import { days as daysModel } from "../../../firebase/common/models";
import TabBar from "../../../components/TabBar/TabBar";
import { connect } from "react-redux";
import { objectToArray } from "../../../utils/utils";
import MenuTable from "../../../components/MenuTable/MenuTable";
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = {
    root: {}
};

class ProviderMenu extends Component {
    days = daysModel;
    ordersRef = null;
    componentWillMount() {
        // this.ordersRef = getAllOrdersyRef();
        // this.ordersRef.on("value", snapshot => {
        //     this.props.allOrdersUpdated(snapshot.val());
        // });
    }
    componentWillUnmount() {
        if (this.ordersRef.hasOwnProperty("off")) {
            this.ordersRef.off();
        }
    }
    render() {
        const orders = this.props.orders
            ? this.days.map(
                  day =>
                      this.props.orders[day] ? (
                          <MenuTable
                              rows={objectToArray(this.props.orders[day])}
                          />
                      ) : null
              )
            : null;

        return (
            <div>
                <TabBar items={this.days} content={orders} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    // orders: state.orders.allOrders
});

const mapDispatchToProps = dispatch => ({
    // allOrdersUpdated: newOrders => dispatch(allOrdersUpdated(newOrders))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ProviderMenu));
