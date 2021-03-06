import React, { Component } from "react";
import {
    findIndexOfObjectByValueInArray,
    getCurrentDay
} from "../../../utils/utils";
import withStyles from "@material-ui/core/styles/withStyles";
import { getAllUsers } from "../../../firebase/userService";
import { getMenus } from "../../../firebase/MenuService";
import { getAllOrdersByDayRef } from "../../../firebase/orderService";
import ProviderOrdersTable from "../../../components/Tables/ProviderOrdersTable/ProviderOrdersTable";
import { ProviderMenuLinks } from "../../../utils/constants";
import { linkSelected } from "../../../store/actions";
import { connect } from "react-redux";

const styles = {
    root: {
        maxWidth: 700,
        margin: "auto",
        paddingTop: 48
    },
    tableContainer: {
        marginBottom: 16
    }
};

class ProviderMenu extends Component {
    allMenus = null;
    users = null;
    ordersRef = null;
    currentDay = null;
    state = {
        orders: null
    };
    componentWillMount() {
        this.props.setDrawerLink(ProviderMenuLinks.ORDERS);
    }
    componentDidMount() {
        this.currentDay = getCurrentDay();
        getMenus().once("value", snapshot => {
            this.allMenus = snapshot.val();
            getAllUsers()
                .then(snapshot => {
                    this.users = snapshot.val();
                    this.ordersRef = getAllOrdersByDayRef(this.currentDay);
                    this.ordersRef.on("value", snapshot => {
                        this.setState({
                            orders: this.parseOrdersData(snapshot.val())
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
    componentWillUnmount() {
        if (this.ordersRef) {
            this.ordersRef.off();
        }
    }
    render() {
        const { classes } = this.props;
        const orderTables = this.state.orders
            ? this.state.orders.map(orderData => (
                  <div
                      key={orderData.category}
                      className={classes.tableContainer}
                  >
                      <ProviderOrdersTable
                          category={orderData.category}
                          orders={orderData.orders}
                      />
                  </div>
              ))
            : null;
        return <div className={classes.root}>{orderTables}</div>;
    }
    parseOrdersData = orders => {
        const ordersData = [];
        for (let userId of Object.keys(orders)) {
            const user = this.users[userId];
            const menu = this.allMenus[orders[userId].id];
            const options = orders[userId].options;
            let indexOfMenu = findIndexOfObjectByValueInArray(
                ordersData,
                "category",
                menu.category
            );
            if (indexOfMenu === -1) {
                ordersData.push({ category: menu.category, orders: [] });
                indexOfMenu = ordersData.length - 1;
            }
            const orderId = options ? menu.title + options[0] : menu.title;
            const ordersForCategory = ordersData[indexOfMenu].orders;
            let indexOfFoodWithOption = findIndexOfObjectByValueInArray(
                ordersForCategory,
                "id",
                orderId
            );
            if (indexOfFoodWithOption === -1) {
                ordersForCategory.push({
                    id: orderId,
                    food: menu.title,
                    options: options ? options[0] : null,
                    numbers: [user.fileNumber]
                });
            } else {
                ordersForCategory[indexOfFoodWithOption].numbers.push(
                    user.fileNumber
                );
            }
        }
        return ordersData;
    };
}

const mapDispatchToProps = dispatch => ({
    setDrawerLink: link => dispatch(linkSelected(link))
});

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(ProviderMenu));
