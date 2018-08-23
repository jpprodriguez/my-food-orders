import React from "react";
import MenuCard from "../../../components/MenuCard/MenuCard";
import { connect } from "react-redux";
import { updateOrderFromDay } from "../../../store/actions";
import { getArrayWithoutItem } from "../../../utils/utils";
import { Order } from "../../../firebase/common/models";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuPerDayCard from "../../../components/MenuPerDayCard/MenuPerDayCard";
import Aux from "../../../hoc/Aux/Aux";

const styles = theme => ({
    menuCard: {
        margin: "0 16px 16px 0px"
    }
});

const MenuPanel = props => {
    const { classes } = props;
    const menuCards = props.menues.map(menuId => {
        const isSelected = props.orders && props.orders[props.day] && props.orders[props.day].id === menuId;
        return (
        <div className={classes.menuCard} key={menuId}>
            <MenuCard
                menuId={menuId}
                selected={isSelected}
                options={
                    props.orders &&
                    props.orders[props.day] &&
                    props.orders[props.day].options
                        ? props.orders[props.day].options
                        : null
                }
                onMenuDetailSelected={item =>
                    handleMenuDetailSelection(item, props)
                }
                onMenuSelected={() => handleMenuSelection(isSelected, menuId, props)}
            />

        </div>
    )});

    return (
        <Aux>
            <MenuPerDayCard day={props.day}>{menuCards}</MenuPerDayCard>
        </Aux>
    );
};

const handleMenuSelection = (isSelected, menuId, props) => {
    let updatedOrder = new Order(menuId, []);
    if(isSelected) {
        updatedOrder.id = null;
    }
    props.updateOrderFromDay(updatedOrder, props.day, props.user);
};

const handleMenuDetailSelection = (item, props) => {
    let changes;

    if (
        props.orders[props.day].options &&
        props.orders[props.day].options.indexOf(item) !== -1
    ) {
        changes = {
            options: getArrayWithoutItem(
                [...props.orders[props.day].options],
                item
            )
        };
    } else {
        changes = {
            options: props.orders[props.day].options
                ? [...props.orders[props.day].options].concat(item)
                : [item]
        };
    }

    props.updateOrderFromDay(changes, props.day, props.user);
};
const mapStateToProps = state => ({
    orders: state.orders.orders,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    updateOrderFromDay: (changes, day, user) =>
        dispatch(updateOrderFromDay(changes, day, user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MenuPanel));
