import React from 'react';
import MenuExpansionPanel from "../../../components/MenuExpansionPanel/MenuExpansionPanel";
import MenuCard from "../../../components/MenuCard/MenuCard";

const MenuPanel = (props) => {
    const menuCards = props.menues.map(menuId =>
        (
            <MenuCard
                key={menuId}
                menuId={menuId}
            />
        ));

    return (
        <MenuExpansionPanel day={props.day}>
            {menuCards}
        </MenuExpansionPanel>
    );
}

export default MenuPanel;