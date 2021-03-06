import React, { Component } from "react";
import { connect } from "react-redux";
import { updateOrderFromDay } from "../../../../store/actions/index";
import { getArrayWithoutItem } from "../../../../utils/utils";
import { Order } from "../../../../firebase/common/models";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuPerDayCard from "../../../../components/MenuPerDayCard/MenuPerDayCard";
import Aux from "../../../../hoc/Aux/Aux";
import { getOrderByDateRoute } from "../../../../firebase/common/routes";
import { orderUpdated } from "../../../../store/actions";
import { getRef } from "../../../../firebase/common/utils";
import CustomerMenuCard from "../../../../components/MenuCard/CustomerMenuCard/CustomerMenuCard";

const styles = {
    menuCard: {
        margin: "0 16px 16px 0px"
    }
};

class MenuPanel extends Component {
    ordersRef = null;
    componentWillMount() {
        this.ordersRef = getRef(
            getOrderByDateRoute(this.props.user.uid, this.props.day)
        );
        this.ordersRef.on("value", snapshot => {
            this.props.orderUpdated(snapshot.val());
        });
    }
    componentWillUnmount() {
        if (this.ordersRef) {
            this.ordersRef.off();
        }
    }
    render() {
        const {
            classes,
            order,
            menus,
            day,
            user,
            updateOrderFromDay
        } = this.props;
        const menuCards = menus.map(menuId => {
            const isSelected = order && order.id === menuId;
            return (
                <div className={classes.menuCard} key={menuId}>
                    <CustomerMenuCard
                        menuId={menuId}
                        selected={isSelected}
                        options={order && order.options ? order.options : null}
                        onMenuDetailSelected={event =>
                            handleMenuDetailSelection(
                                event,
                                order,
                                day,
                                user,
                                updateOrderFromDay
                            )
                        }
                        onMenuSelected={() =>
                            handleMenuSelection(
                                isSelected,
                                menuId,
                                day,
                                user,
                                updateOrderFromDay
                            )
                        }
                    />
                </div>
            );
        });

        return (
            <Aux>
                <MenuPerDayCard day={day}>{menuCards}</MenuPerDayCard>
            </Aux>
        );
    }
}

const handleMenuSelection = (
    isSelected,
    menuId,
    day,
    user,
    updateOrderFromDay
) => {
    let updatedOrder = new Order(menuId, []);
    if (isSelected) {
        updatedOrder.id = null;
    }
    updateOrderFromDay(updatedOrder, day, user);
};

const handleMenuDetailSelection = (
    event,
    order,
    day,
    user,
    updateOrderFromDay
) => {
    const item = event.target.value;
    let changes;

    if (order.options && order.options.indexOf(item) !== -1) {
        changes = {
            // options: getArrayWithoutItem([...order.options], item);
            options: null
        };
    } else {
        changes = {
            // options: order.options ? [...order.options].concat(item) : [item]
            options: [item]
        };
    }

    updateOrderFromDay(changes, day, user);
};
const mapStateToProps = state => ({
    order: state.orders.order,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    updateOrderFromDay: (changes, day, user) =>
        dispatch(updateOrderFromDay(changes, day, user)),
    orderUpdated: order => dispatch(orderUpdated(order))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MenuPanel));
