import React, { Component } from "react";
import { getAllUsers } from "../../../../firebase/userService";
import { days as daysModel } from "../../../../firebase/common/models";
import { objectToArray, objectToArrayWithKey } from "../../../../utils/utils";
import MenuTable from "../../../../components/MenuTable/MenuTable";
import TabBar from "../../../../components/TabBar/TabBar";
import { getOrderByDateRoute } from "../../../../firebase/common/routes";
import { getRef } from "../../../../firebase/common/utils";

class OrdersPanel extends Component {
    render() {
        return (
            <div>
                <MenuTable users={this.props.users} day={this.props.day} />
            </div>
        );
    }
}

export default OrdersPanel;
