import React from "react";
import MenuExpansionPanel from "../../../components/MenuExpansionPanel/MenuExpansionPanel";
import MenuCard from "../../../components/MenuCard/MenuCard";
import { connect } from "react-redux";
import { updateOrderFromDay } from "../../../store/actions";
import { getArrayWithoutItem } from "../../../utils/utils";
import { Order } from "../../../firebase/common/models";
import Paper from "@material-ui/core/Paper/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuPerDayCard from "../../../components/MenuPerDayCard/MenuPerDayCard";

const styles = theme => ({
    menuCard: {
        margin: "0 16px 16px 0px"
    }
});

const MenuPanel = props => {
    const { classes } = props;
    const menuCards = props.menues.map(menuId => (
        <div className={classes.menuCard} key={menuId}>
            <MenuCard
                menuId={menuId}
                selected={
                    props.orders &&
                    props.orders[props.day] &&
                    props.orders[props.day].id === menuId
                }
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
                onMenuSelected={() => handleMenuSelection(menuId, props)}
                onMenuRemoved={() => handleMenuSelection(null, props)}
            />
        </div>
    ));

    return <MenuPerDayCard day={props.day}>{menuCards}</MenuPerDayCard>;
};

const handleMenuSelection = (menuId, props) => {
    let updatedOrder = new Order(menuId, []);
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
