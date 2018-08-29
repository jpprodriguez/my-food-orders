import React, { Component } from "react";
import MenuTable from "../../../../components/MenuTable/MenuTable";

class OrdersPanel extends Component {
    render() {
        return (
            <div>
                <MenuTable orders={this.props.orders} day={this.props.day} />
            </div>
        );
    }
}

export default OrdersPanel;
