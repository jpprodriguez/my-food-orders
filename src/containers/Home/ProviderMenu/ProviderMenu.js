import React, { Component } from "react";
import { days as daysModel } from "../../../firebase/common/models";
import TabBar from "../../../components/TabBar/TabBar";
import { connect } from "react-redux";
import { objectToArray } from "../../../utils/utils";
import MenuTable from "../../../components/MenuTable/MenuTable";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {getAllUsers} from "../../../firebase/userService";
import OrdersPanel from "../common/OrdersPanel/OrdersPanel";

const styles = {
    root: {}
};

class ProviderMenu extends Component {


    render() {
        const orderPanels = this.state.users
            ? this.days.map(
                day =>
                    // this.props.orders[day] ? (
                    //     <OrdersPanel
                    //         day={day}
                    //     />
                    // ) : null
                    null
            )
            : null;

        return (
            <div>
                <TabBar items={this.days} content={orderPanels} />
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
