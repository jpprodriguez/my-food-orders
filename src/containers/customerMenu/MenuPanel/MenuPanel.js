import React from "react";
import MenuExpansionPanel from "../../../components/MenuExpansionPanel/MenuExpansionPanel";
import MenuCard from "../../../components/MenuCard/MenuCard";
import { connect } from "react-redux";
import { updateOrderFromDay } from "../../../store/actions";
import { getArrayWithoutItem } from "../../../utils/utils";

const MenuPanel = props => {
    const menuCards = props.menues.map(menuId => (
        <MenuCard
            key={menuId}
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
        />
    ));

    return <MenuExpansionPanel day={props.day}>{menuCards}</MenuExpansionPanel>;
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
)(MenuPanel);
