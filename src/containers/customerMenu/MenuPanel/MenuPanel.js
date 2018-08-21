import React from "react";
import MenuExpansionPanel from "../../../components/MenuExpansionPanel/MenuExpansionPanel";
import MenuCard from "../../../components/MenuCard/MenuCard";
import { connect } from "react-redux";

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
                props.orders[props.day] && props.orders[props.day].options
                    ? props.orders[props.day].options
                    : null
            }
        />
    ));

    return <MenuExpansionPanel day={props.day}>{menuCards}</MenuExpansionPanel>;
};

const mapStateToProps = state => ({
    orders: state.orders.orders
});

export default connect(
    mapStateToProps,
    null
)(MenuPanel);
