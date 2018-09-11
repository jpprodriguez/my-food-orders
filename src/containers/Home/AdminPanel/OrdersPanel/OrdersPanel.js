import React, { Component } from "react";
import MenuTable from "../../../../components/Tables/MenuTable/MenuTable";

class OrdersPanel extends Component {
    componentWillMount() {
        if (this.props.onInit) {
            this.props.onInit();
        }
    }
    render() {
        return (
            <div>
                <MenuTable orders={this.props.orders} day={this.props.day} />
            </div>
        );
    }
}

export default OrdersPanel;
